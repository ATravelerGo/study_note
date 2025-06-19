import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import tailwindcss from '@tailwindcss/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path';

export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(),
		AutoImport({
			resolvers: [VantResolver()]
		}),
		Components({
			resolvers: [VantResolver()]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	build: {
		outDir: 'dist_uni_patients_information', // 打包目录
		assetsDir: 'static', // 静态资源目录（js, css, img）
		sourcemap: false, // 生产环境关闭 source map
		minify: 'esbuild', // 可选 esbuild（快）或 terser（可配）
		terserOptions: {
			compress: {
				drop_console: true, // 移除 console
				drop_debugger: true
			}
		},

		rollupOptions: {
			output: {
				// JS：入口文件和动态导入的 chunk
				entryFileNames: 'static/js/[name]-[hash].js',
				chunkFileNames: 'static/js/[name]-[hash].js',

				// 静态资源文件：图片、字体、CSS 等
				assetFileNames: (assetInfo) => {
					const ext = assetInfo.name?.split('.').pop();

					// 根据文件类型分目录
					if (/css/i.test(ext!)) return 'static/css/[name]-[hash][extname]';
					if (/(png|jpe?g|gif|svg|webp|ico)/i.test(ext!)) return 'static/img/[name]-[hash][extname]';
					if (/(ttf|woff2?|eot)/i.test(ext!)) return 'static/fonts/[name]-[hash][extname]';

					// 其他默认放 assets
					return 'static/assets/[name]-[hash][extname]';
				}
			}
		},

		chunkSizeWarningLimit: 1000 // 单文件超过多少 KB 警告
	},
	//服务器配置
	server: {
		//配置端口
		//host: '0.0.0.0', //本机地址
		//port:5000,  //通过5000端口号访问
		proxy: {
			'/api': {
				//目的地址 => 代理服务器,需要向该地址发起请求
				target: 'http://47.109.189.52:5566',
				//是否跨域
				changeOrigin: true,
				//是否重写  将路径中的 /api 重写为''  ,重写的是自己的路径地址
				//向存储数据的服务器发送请求的地址是  target中的地址 + 自己写的路径
				//如果不重写, 则请求地址中会有两个 /api 字符, 这样请求的地址就错了
				rewrite: (path) => {
					return path.replace(/^\/api/, '');
				}
			}
		}
	}
});
