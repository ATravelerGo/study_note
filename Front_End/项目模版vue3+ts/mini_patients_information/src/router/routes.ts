interface Routes {
	path: string;
	name: string;
	component: Function;
	meta?: { [key: string]: any };
	children?: Routes[];
}

const routes: Routes[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/App.vue') // 默认路由，渲染 Home 组件
	}
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	component: About // 渲染 About 组件
	// },
	// {
	// 	path: '/:pathMatch(.*)*', // 捕获所有未匹配的路径
	// 	name: 'NotFound',
	// 	component: NotFound // 渲染 NotFound 组件
	// }
];

export default routes;
