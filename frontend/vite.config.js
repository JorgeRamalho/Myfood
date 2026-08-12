import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(rootDir, "src");

function emitDistIndex() {
  return {
    name: "myfood-emit-dist-index",
    closeBundle() {
      const distDir = path.resolve(rootDir, "dist-site");
      const from = path.join(distDir, "index.html");
      if (!fs.existsSync(from)) {
        const nested = path.join(distDir, "src", "index.html");
        if (fs.existsSync(nested)) {
          fs.copyFileSync(nested, from);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["brand/logo-mark.png"],
      manifest: {
        name: "MyFood",
        short_name: "MyFood",
        description:
          "MyFood — O sabor que vem até você. Delivery de restaurantes online.",
        theme_color: "#E0311F",
        background_color: "#F7F6F4",
        display: "standalone",
        lang: "pt-BR",
        start_url: "./",
        scope: "./",
        icons: [
          {
            src: "brand/logo-mark.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "brand/logo-mark.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,webmanifest}"],
        navigateFallback: "index.html",
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        globIgnores: ["**/hero-food.png", "**/client-avatar.png", "**/wordmark.png"],
      },
      devOptions: {
        enabled: false,
      },
    }),
    emitDistIndex(),
  ],
  root: srcDir,
  base: "./",
  publicDir: path.join(rootDir, "public"),
  server: {
    port: 5173,
    open: "/",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3333",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: path.join(rootDir, "dist-site"),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.join(srcDir, "index.html"),
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
