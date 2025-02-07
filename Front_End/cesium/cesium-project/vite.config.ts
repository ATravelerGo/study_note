import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),cesium()],
  define:{
    CESIUM_BASE_URL:"/"
  }
})
