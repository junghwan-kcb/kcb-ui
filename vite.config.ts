import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  base: command === "build"
    ? "/pylon-manager/react/"
    : "/",

  server: {
    proxy: {
      "/pylon-manager": {
        target: "http://localhost:56080",
        changeOrigin: true,
      },
    },
  },

  build: {
    lib: {
      entry: "src/index.ts",
      name: "KcbUi",
      fileName: "index",
    },

    rollupOptions: {
      external: [
        "react",
        "react-dom",
      ],
    },
  },
}));