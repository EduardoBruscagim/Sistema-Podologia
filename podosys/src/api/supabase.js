// ============================================================
//  PodoSys — Supabase Client API
//  Instância única para comunicação com o PostgreSQL e Auth.
// ============================================================

import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Critical: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY devem estar configurados no arquivo .env na raiz do projeto.',
  )
}

// Exporta a instância pronta para uso
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
