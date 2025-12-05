import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Ensure root-relative paths
  build: {
    outDir: "dist", // Must match Vercel output directory
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000", // For local dev only
      "/uploads": "http://localhost:5000",
    },
  },
});