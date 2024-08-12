import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'main.js',
    output: {
        file: 'bundle.js',
        format: 'iife', // 或其他你需要的格式，例如 'es', 'cjs', 等
        name: 'MyBundle'
    },
    plugins: [
        commonjs()
    ]
};
