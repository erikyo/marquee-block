const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
    'marquee-block': path.resolve( process.cwd(), `src/marquee-block.tsx` ),
    'wp-blocks-marquee': path.resolve( process.cwd(), `src/frontend.ts` ),
	},
};
