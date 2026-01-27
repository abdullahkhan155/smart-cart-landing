import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import crypto from "crypto"

export const runtime = "nodejs"

async function saveLocal(fullName: string, email: string) {
  const { saveDemoRequest } = await import("@/lib/demo-store")
  await saveDemoRequest(fullName, email)
}

function isProductionRuntime() {
  return process.env.NODE_ENV === "production" || !!process.env.VERCEL
}

type SupabaseErrorLike = {
  message?: string
  code?: string
  details?: string
  hint?: string
}

function errorMessage(err: unknown) {
  if (err instanceof Error) return err.message
  return typeof err === "string" ? err : "unknown error"
}

function formatSupabaseError(error: SupabaseErrorLike | null) {
  if (!error) return "unknown"
  const parts = [error.message, error.code, error.details, error.hint].filter(Boolean)
  return parts.join(" | ")
}

export async function GET() {
  // Safe, minimal health info for local debugging.
  const supabaseAdmin = getSupabaseAdmin()
  return NextResponse.json({
    ok: true,
    hasSupabase: !!supabaseAdmin,
    hasUrl: !!process.env.SUPABASE_URL,
    hasServiceRoleKey: !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const fullName = (body?.fullName || "").trim()
    const email = (body?.email || "").trim()

    if (!fullName || !email) {
      return NextResponse.json({ ok: false, message: "Name and email required" }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()
    if (!supabaseAdmin) {
      if (isProductionRuntime()) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Supabase is not configured on the server. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Project Settings → Environment Variables, then redeploy.",
          },
          { status: 500 }
        )
      }

      // Dev fallback to local SQLite if Supabase is not configured
      try {
        await saveLocal(fullName, email)
        return NextResponse.json({ ok: true, storage: "local" })
      } catch (fallbackErr: unknown) {
        console.error("Local save failed", fallbackErr)
        return NextResponse.json(
          { ok: false, message: `Local save failed: ${errorMessage(fallbackErr)}` },
          { status: 500 }
        )
      }
    }

    const { error } = await supabaseAdmin.from("demo_requests").insert({
      id: crypto.randomUUID(),
      full_name: fullName,
      email,
      created_at: new Date().toISOString(),
    })
    if (error) {
      console.error("Supabase insert failed", error)
      if (isProductionRuntime()) {
        return NextResponse.json(
          { ok: false, message: `Supabase insert failed: ${formatSupabaseError(error)}` },
          { status: 502 }
        )
      }

      // Dev fallback
      try {
        await saveLocal(fullName, email)
        return NextResponse.json({ ok: true, storage: "local-fallback" })
      } catch (fallbackErr: unknown) {
        console.error("Local fallback also failed", fallbackErr)
        return NextResponse.json(
          {
            ok: false,
            message: `Supabase error: ${formatSupabaseError(error)}; local fallback failed: ${
              errorMessage(fallbackErr)
            }`,
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ ok: true, storage: "supabase" })
  } catch (err) {
    console.error("demo save failed", err)
    const msg = err instanceof Error ? err.message : "Unable to save demo request"
    return NextResponse.json({ ok: false, message: msg }, { status: 500 })
  }
}
