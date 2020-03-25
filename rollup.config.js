import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.js',
	output: {
		name: 'experiment',
		file: 'dist/index.js',
		format: 'cjs'
	},
	external: [
		'react', 
		'prop-types'
	],
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**',
		}),
		commonjs({
			namedExports: {
				'node_modules/react-js/index.js': ['isValidElementType'],
			},
			include: [
				/node_modules\/prop-types/,
				/node_modules\/react-is/,
			],
		})
	]
}