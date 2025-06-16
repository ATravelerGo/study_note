import pxToViewport from 'postcss-px-to-viewport-8-plugin';

export default {
    plugins: [
        pxToViewport({
            unitToConvert: 'px',
            viewportWidth: 750, // 设计稿宽度
            unitPrecision: 6, // 转换后保留位数
            propList: ['*'], // 需要转换的属性
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.pc'],
            minPixelValue: 1,
            mediaQuery: false, // 不转换媒体查询中的 px
            exclude: [/node_modules/] // 排除 node_modules
        })
    ]
};
