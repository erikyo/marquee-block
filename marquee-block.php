<?php

/**
 * Plugin Name:       Marquee block
 * Description:       the missing marquee block
 * Version:           0.0.1
 * Requires at least: 5.7
 * Tested up to:      6.2.1
 * Requires PHP:      7.1.0
 * Author:            codekraft
 * Author URI:        https://codekraft.it
 * License:           GPL v3 or later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       marquee
 */

/**
 * It adds a class to the paragraph element of the core/paragraph block
 *
 * @param array $attributes The attributes of the block.
 * @param string $content The content of the block.
 *
 * @return string The content of the block.
 */
function render_marquee_block( $attributes, $content ) {

	if ( ! empty( $attributes['speed'] ) ) {

		// a regex that search for the tag figure with the wp-block-media-text__media class.
		$regex = '/(.*<p.*?class="block-editor-rich-text".*?>)(.*?)(<\/p>.*)/';

		// Get the content of the block.
		preg_match( $regex, $content, $paragraph, PREG_OFFSET_CAPTURE );

		// Set the image class attribute.
		$additional_block_class = "marquee_block marquee_speed_" . esc_attr( $attributes['speed'] );

		// Add the custom classes and return the content of the block.
		$text    = str_replace( "class=\"", "class=\"" . $additional_block_class . " ", $paragraph[2][0] );
		$content = preg_replace( $regex, "$1$text$3", $content );
	}

	return $content;
}

/**
 * We're cloning the core/media-text block, renaming it, and adding a new attribute that will hold the additional css classes
 *
 * @return void The block type object.
 */
function register_marquee_block() {

	$namespace   = 'wp-blocks';
	$block_title = 'marquee';

	// Get the original block type.
	$original_block = WP_Block_Type_Registry::get_instance()->get_registered( 'core/paragraph' );

	if ( ! $original_block ) {
		return;
	}

	// Clone the block type.
	$cloned_block = new WP_Block_Type( $namespace . '/' . $block_title, $original_block);

	$cloned_block->set_props(array(
		'name'            => $namespace . '/' . $block_title,
		'title'           => __( 'Marquee', 'modul-r' ),
		'render_callback' => 'render_marquee_block',
	));

	// Register the new block type.
	register_block_type( $namespace . '/' . $block_title, $cloned_block );
}

add_action( 'init', 'register_marquee_block' );

/**
 * It enqueues the JavaScript file that contains the custom block code
 */
function modul_r_enqueue_marquee_block() {

	// Get the block dependencies and version.
	$asset = include dirname( __FILE__ ) . '/build/marquee-block.asset.php';

	// Register the new block type.
	wp_enqueue_script( 'modulr-marquee-block-script', MODULR_THEME_URL . '/build/marquee-block.js', $asset['dependencies'], $asset['version'] );
}
add_action( 'enqueue_block_editor_assets', 'modul_r_enqueue_marquee_block' );
