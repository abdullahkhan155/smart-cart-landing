import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cached: SupabaseClient<any, "public", any> | null | undefined

export function getSupabaseAdmin() {
  if (cached !== undefined) return cached

  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

  if (!url || !serviceRoleKey) {
    console.warn("Supabase env vars missing: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY)")
    cached = null
    return cached
  }

  cached = createClient<any>(url, serviceRoleKey, { auth: { persistSession: false } })
  return cached
}

export const supabaseAdmin = getSupabaseAdmin()
