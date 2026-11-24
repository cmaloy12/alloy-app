// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
const env = loadEnv(mode, ".", "");
console.log("token:", env.ALLOY_TOKEN?.slice(0, 4), "secret length:", env.ALLOY_SECRET?.length);
const auth = btoa(`${env.ALLOY_TOKEN}:${env.ALLOY_SECRET}`);
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://sandbox.alloy.co",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/v1"),
          headers: { Authorization: `Basic ${auth}` },
        },
      },
    },
  };
});
