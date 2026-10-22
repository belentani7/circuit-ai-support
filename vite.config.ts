import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * CIRCUIT public research brief: no silent session replay, browser-log collection,
 * vendor storage proxy or analytics injection during development.
 */
const root = import.meta.dirname;
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(root, "client", "src"),
      "@shared": path.resolve(root, "shared"),
    },
  },
  envDir: root,
  root: path.resolve(root, "client"),
  build: {
    outDir: path.resolve(root, "dist", "public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
    fs: { strict: true, deny: ["**/.*"] },
  },
});
