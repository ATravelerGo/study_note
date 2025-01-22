import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'main.ts', // 指定组件库入口
      name: 'FreeUI', // 全局变量名称（用于 UMD 构建）
      fileName: (format) => `free-ui.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      external: ['vue'], // 指定外部依赖
      output: {
        globals: {
          vue: 'Vue', // 外部依赖的全局变量名称
        },
      },
    },
  },
})
