import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/index.css", dest: "." },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        settings: "settings.html",
        contentScript: "src/content-script.ts",
        serviceWorker: "src/service-worker.ts",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "contentScript" ||
            chunkInfo.name === "serviceWorker"
            ? "[name].js"
            : "assets/[name]-[hash].js";
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
