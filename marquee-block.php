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
 * Text Domain:       wbm
 */

include 'inc/render_callback.php';

/**
 * We're cloning the core/paragraph block, renaming it, and adding a new attribute that will hold the additional css classes
 *
 * @return void The block type object.
 */
function register_marquee_block() {

	// Get the original block type.
	$original_block = WP_Block_Type_Registry::get_instance()->get_registered( 'core/paragraph' );

	if ( ! $original_block ) {
		return;
	}

	$namespace   = 'wp-blocks';
	$block_title = 'marquee';

	// Clone the block type.
	$cloned_block = clone $original_block;

	$cloned_block->name = $namespace . '/' . $block_title;
	$cloned_block->title = __( 'Marquee', 'wbm' );
	$cloned_block->render_callback = 'render_marquee_block';
	$cloned_block->attributes['namespace'] = array(
		'type' => 'string',
		'value' => $namespace,
	);
	$cloned_block->attributes['speed'] = array(
		'type' => 'number',
		'value' => 200,
	);

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
	wp_enqueue_script( 'modulr-marquee-block-script',  plugins_url() . '/marquee-block/build/marquee-block.js', $asset['dependencies'], $asset['version'] );
}
add_action( 'enqueue_block_editor_assets', 'modul_r_enqueue_marquee_block' );
