import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Otimização agressiva e injeção do Tailwind v4
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: "es2024",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
});
