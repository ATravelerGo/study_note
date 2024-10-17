import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
export default {
    input: ['main.js','main2.js'],
    output: {
       // file: 'dist/bundle.js',//当使用代码拆分的时候 file就不能用了 换dir代替
        dir: 'dist',
        format: 'es', // 或其他你需要的格式，例如 'esm', 'cjs', 等  iife不支持代码拆分 也就是不支持代码中的动态导入
        name: 'MyBundle',

    },
    plugins: [
        // commonjs()
        json(),
        // terser()
    ]
};
