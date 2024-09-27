import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Sea Keeper", // 설치 배너에 표시되는 이름
        short_name: "Sea Keeper", // 아이콘 아래에 표시될 이름
        description: "바다환경지킴이를 위한 어플리케이션",
        theme_color: "#ffffff",
        lang: "ko",
        background_color: "#ffffff",
        prefer_related_applications: true,
        display: "standalone",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0", // 모든 IP에서 접근 가능
    port: 3000, // 원하는 포트 번호
  },
});
