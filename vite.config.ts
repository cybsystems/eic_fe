import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // or '0.0.0.0' to bind to all network interfaces
    port: 3000, // Specify the port if you want to use a different one
  },
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Warehouse Management System",
        short_name: "WHMS",
        description: "Warehouse Management System",
        theme_color: "#47126b",
        background_color:"#47126b",
        icons: [
          {
            src: "/vite.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/vite.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      
    }),
  ],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@api": path.resolve(__dirname, "src/api"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),


      // Add more aliases as needed
    },
  },
});
