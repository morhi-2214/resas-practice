// import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  base: "./",
  build: {
    outDir: "../public",
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
