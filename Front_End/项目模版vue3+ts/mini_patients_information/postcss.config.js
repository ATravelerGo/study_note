export default {
	plugins: {
		'postcss-px-to-viewport': {
			viewportWidth: 750,
			// viewportHeight: 667,
			unitPrecision: 5,
			viewportUnit: 'vw',
			selectorBlackList: ['.ignore'],
			minPixelValue: 1,
			mediaQuery: false,
			exclude: [/node_modules/]
		}
	}
};
