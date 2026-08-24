// -----------------------------------------------------------------------------
// PodoSys — Supabase Client (Lazy-loaded)
// Instância única sob demanda do SDK para comunicação com PostgreSQL e Auth.
// Permite dynamic import() para não incluir o SDK no caminho crítico inicial.
// -----------------------------------------------------------------------------

let supabaseInstance = null

export async function getSupabase() {
  if (!supabaseInstance) {
    const { createClient } = await import('@supabase/supabase-js')

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        '[PodoSys] VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY devem estar definidos no .env',
      )
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }

  return supabaseInstance
}

