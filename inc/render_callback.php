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

		$regex = '/(<p.*?>)(.*?)(<\/p>)/s';

		$additionalBlockClass = "marquee_block";
		$additionalBlockDataset = 'data-marquee-speed="' . esc_attr($attributes['speed']) . '" ';

		// Add the custom attributes and return the content of the block.
		$content = preg_replace_callback($regex, function ($matches) use ($additionalBlockDataset, $additionalBlockClass) {
			$openingTag = $matches[1];
			$content = $matches[2];
			$closingTag = $matches[3];

			$modifiedOpeningTag = str_replace('<p ', '<p ' . $additionalBlockDataset, $openingTag);
			$modifiedOpeningTag = str_replace('class="', 'class="' . $additionalBlockClass . ' ', $modifiedOpeningTag);

			return $modifiedOpeningTag . $content . $closingTag;
		}, $content);
	}

	return $content;
}
