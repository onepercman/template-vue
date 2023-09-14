import vue from "@vitejs/plugin-vue"
import { defineConfig, loadEnv } from "vite"
import vitePluginRadar from "vite-plugin-radar"
import { default as viteTsConfigPaths } from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    viteTsConfigPaths({
      loose: true,
    }),
    vitePluginRadar({
      analytics: {
        id: loadEnv(mode, process.cwd()).VITE_GA_ID,
      },
      enableDev: true,
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
}))
