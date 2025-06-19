import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';

//ESLint 不原生支持直接用 TS 写配置文件，它只会默认加载 .js 文件（或 .cjs、.mjs） 但可以通过下载官方插件支持。
export default defineConfig([
	{
		//ignores 会在 全局生效，作用于后续所有配置项
		ignores: ['node_modules', 'dist', 'public']
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
		plugins: { js },
		extends: ['js/recommended']
	}, //启用 ESLint 官方的 JavaScript 推荐规则，覆盖所有 JS/TS/Vue 文件。
	{ files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], languageOptions: { globals: globals.browser } }, //添加浏览器全局变量（比如 window/document 等）,让 ESLint 识别你代码中用到的浏览器变量，避免误报未定义变量错误。
	tseslint.configs.recommended, // 加这一行，启用 TS 推荐规则
	pluginVue.configs['flat/essential'], //启用 Vue 官方的基本推荐规则（Essential）。你也可以换成 'flat/recommended' 来启用更严格、更完整的规则。
	{ files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } }, // vue 文件内使用 TS 解析器（让 <script lang="ts"> 正确解析）
	{ files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] }, //对 JSON 文件启用 JSON 插件和推荐规则。
	{
		rules: {
			'vue/multi-word-component-names': 'off' // 要求组件的名称必须是多词命名，避免与 HTML 标签（如 <div>、<span>、<menu> 等）冲突。暂时关闭
		}
	}
]);
