import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Setup enxuto: Vite + Tailwind sem complexidade prematura
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: "es2024",
    minify: "esbuild",
  },
});
