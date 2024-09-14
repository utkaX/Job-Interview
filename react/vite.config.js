import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hot: true,
    proxy:{
      '/api':'http://localhost:8080'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Adjust based on your libraries
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
