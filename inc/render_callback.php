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

	$regex = '/(<p(?:\s+[^>]*?)?>)(.*?)(<\/p>)/s';

	$speed = !empty($attributes['speed']) ? esc_attr($attributes['speed']) : 500;
	$direction = !empty($attributes['scrollDirection']) ? esc_attr($attributes['scrollDirection']) : 'left';

	$additionalBlockDataset = 'data-marquee-speed="' . $speed . '" data-marquee-direction="' . $direction . '" ';

	$additionalClass = 'marquee-block';

	if (strpos($content, 'class=') === false) {
		// If class attribute doesn't exist, add it
		$content = str_replace('<p', '<p '.$additionalBlockDataset.'class="' . $additionalClass . '"', $content);
	} else {
		// If class attribute exists, append the additional class
		$content = str_replace('class="', $additionalBlockDataset .'class="' . $additionalClass . ' ', $content);
	}

	return $content;
}
