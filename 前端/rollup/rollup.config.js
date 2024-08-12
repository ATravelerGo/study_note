import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
export default {
    input: 'main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife', // 或其他你需要的格式，例如 'es', 'cjs', 等
        name: 'MyBundle'
    },
    plugins: [
        // commonjs()
        json(),
        terser()
    ]
};
