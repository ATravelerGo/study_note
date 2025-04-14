import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path';

export default defineConfig({
	plugins: [
		vue(),
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
