module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				slide: {
					'100%': { transform: 'scaleX(0)' }
				}
			}
		}
	},
	plugins: []
};
