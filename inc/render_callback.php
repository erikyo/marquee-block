<?php

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
		$regex = '/(.*<p.*?">)(.*?)(<\/p>.*)/';

		// Get the content of the block.
		preg_match( $regex, $content, $paragraph, PREG_OFFSET_CAPTURE );

		// Set the image class attribute.
		$additional_block_class = "marquee_block marquee_speed_" . esc_attr( $attributes['speed'] );

		// Add the custom classes and return the content of the block.
		$text    = str_replace( "class=\"", "class=\"" . $additional_block_class . " ", $paragraph[1][0] );
		$content = preg_replace( $regex, "$1$text$3", $content );
	}

	return $content;
}
