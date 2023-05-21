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
include 'inc/registration.php';

/**
 * It enqueues the JavaScript file that contains the custom block code
 */
function modul_r_enqueue_marquee_block() {

	// Get the block dependencies and version.
	$asset = include dirname( __FILE__ ) . '/build/marquee-block.asset.php';

	// Register the new block type.
	wp_enqueue_script( 'wp-blocks-marquee-admin',  plugins_url() . '/marquee-block/build/marquee-block.js', $asset['dependencies'], $asset['version'] );
}
add_action( 'enqueue_block_editor_assets', 'modul_r_enqueue_marquee_block' );


/**
 * Main template scripts
 */
function modul_r_theme_scripts() {

	wp_dequeue_script( 'jquery' );

	$asset = include dirname( __FILE__ ) . '/build/wp-blocks-marquee.asset.php';

	/* Register and Enqueue */
	wp_enqueue_script( 'wp-blocks-marquee',  plugins_url() . '/marquee-block/build/wp-blocks-marquee.js', $asset['dependencies'], $asset['version'], true );
	wp_enqueue_style( 'wp-blocks-marquee',  plugins_url() . '/marquee-block/build/marquee-block.css', $asset['dependencies'], $asset['version'] );
}

add_action( 'wp_enqueue_scripts', 'modul_r_theme_scripts' ); // Add Theme admin scripts
add_action( 'admin_enqueue_scripts', 'modul_r_theme_scripts' ); // Add Theme admin scripts
