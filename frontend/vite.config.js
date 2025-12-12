import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
