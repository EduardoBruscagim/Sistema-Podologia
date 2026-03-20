// ============================================================
//  PodoSys — Supabase Client
//  Instância única do SDK para comunicação com PostgreSQL e Auth.
// ============================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[PodoSys] VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY devem estar definidos no .env',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
