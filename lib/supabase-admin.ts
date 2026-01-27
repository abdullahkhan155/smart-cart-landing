import { createClient } from "@supabase/supabase-js"

const url = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

if (!url || !serviceRoleKey) {
  console.warn("Supabase env vars missing: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY)")
}

export const supabaseAdmin = url && serviceRoleKey ? createClient(url, serviceRoleKey) : null
