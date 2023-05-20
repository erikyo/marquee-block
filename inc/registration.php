<?php

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

	// Register the new block type.
	register_block_type( $namespace . '/' . $block_title, $cloned_block );
}

add_action( 'init', 'register_marquee_block' );
