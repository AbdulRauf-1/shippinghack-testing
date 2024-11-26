import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  css: { preprocessorOptions: { css: { modules: { localsConvention: 'camelCaseOnly', }, }, }, },
  server: {
    host: "0.0.0.0",
  },
  // base: "https://web.fomino.ch/",
});