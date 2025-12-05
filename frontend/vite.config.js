import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // Important! Ensures asset paths are correct
  build: {
    outDir: "dist", // Vercel output
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000", // local dev only
      "/uploads": "http://localhost:5000",
    },
  },
});
