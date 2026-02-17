import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

/**
 * Configuração Vite 8 para PodoSys
 * Foco em ES2024 e compressão extrema de assets. [cite: 282, 410, 481]
 */
export default defineConfig({
  plugins: [
    tailwindcss(), // Activa o motor do Tailwind 4.1
  ],
  build: {
    target: "esnext", // Habilita funcionalidades modernas do ES2024
    minify: "terser",
  },
});
