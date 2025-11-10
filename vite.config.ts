import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx({
      extension: /\.mdx?$/,
    }),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "scheduler"],
          router: ["react-router-dom"],
          icons: ["lucide-react"],
          radix: ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-toast"],
          maps: ["react-simple-maps"],
          charts: ["recharts"],
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
