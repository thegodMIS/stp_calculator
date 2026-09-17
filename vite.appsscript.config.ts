import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // Apps Script runs in the browser and does not provide
  // Node's `process` global. Define the small environment
  // object required by the production bundle.
  define: {
    process: JSON.stringify({
      env: {
        NODE_ENV: "production",
      },
    }),
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist-appsscript",
    emptyOutDir: true,

    // Build React as one classic browser script.
    // This is required because Apps Script will place
    // the generated JavaScript inside a normal <script> tag.
    lib: {
      entry: path.resolve(
        __dirname,
        "./src/main.tsx"
      ),
      name: "STPCalculator",
      formats: ["iife"],
      fileName: () => "stp-calculator",
      cssFileName: "stp-calculator",
    },

    // Keep CSS together.
    cssCodeSplit: false,

    // Do not let the CSS minifier alter Tailwind CSS.
    cssMinify: false,

    // Keep JavaScript unminified while debugging
    // the Apps Script production environment.
    minify: false,
  },
});