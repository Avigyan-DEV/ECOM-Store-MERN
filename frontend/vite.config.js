import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // important for production
  build: {
    outDir: "dist", // must match Vercel output
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000", // only for local dev
      "/uploads": "http://localhost:5000",
    },
  },
});
