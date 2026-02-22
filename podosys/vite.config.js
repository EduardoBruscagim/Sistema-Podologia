import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Configuração mínima e direta — sem complexidade prematura
export default defineConfig({
  plugins: [tailwindcss()],

  server: {
    port: 3000,
    host: true, // Expõe na rede local para testes em dispositivos
  },

  build: {
    target: "es2024",
    minify: "esbuild",
  },
});
