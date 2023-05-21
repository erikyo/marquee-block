function getSpanItemWidth(clone: HTMLElement) {
	// Append the span to the body
	document.body.appendChild(clone);
	// Get the width
	const itemWidth = clone.offsetWidth;
	// Remove the span
	document.body.removeChild(clone);

	return itemWidth;
}

function getDirectionOptions(direction: string) {
	switch (direction) {
		case 'left':
			return { transform: 'translateX', direction: false };
		case 'right':
			return { transform: 'translateX', direction: true };
		case 'top':
			return { transform: 'translateY', direction: false };
		case 'bottom':
			return { transform: 'translateY', direction: true };
		default:
			return { transform: 'translateX', direction: true };
	}
}

function marquee() {
	const selector = '.marquee-block';
	const marqueeContainers:NodeListOf<HTMLElement> = document.querySelectorAll(selector);
	marqueeContainers.forEach((originalParagraph: HTMLElement) => {
		let speed = parseInt(originalParagraph?.dataset?.marqueeSpeed ?? "200");
		let direction = String(originalParagraph?.dataset?.marqueeDirection ?? "left");

		// parse the direction options
		const directionOptions = getDirectionOptions(direction);

		// Get the inner text
		const text = originalParagraph.innerHTML;

		// the wrapper of the marquee
		const cloneContainer = document.createElement('span');
		cloneContainer.classList.add('marquee-block-inner');

		// the clone of the paragraph
		const cloneElement = document.createElement('span');
		cloneElement.innerHTML = text;

		// Calculate the width of the item and screen
		const textWidth = getSpanItemWidth(cloneElement);
		const paragraphWidth = originalParagraph.clientWidth || window.innerWidth || document.documentElement.clientWidth;
		const paragraphHeight = originalParagraph.clientHeight || window.innerHeight || document.documentElement.clientHeight;
		const repeatCount = Math.ceil(paragraphWidth / textWidth) + 1;

		// Repeat the item to fill the screen
		for (let j = 0; j < repeatCount; j++) {
			// Append the clone after the item
			cloneContainer.innerHTML += text;
		}

		// replace the content of originalParagraph with the cloneContainer
		originalParagraph.innerHTML = '';
		originalParagraph.appendChild(cloneContainer);

		// Set the speed of the marquee
		let directionMultiplier = directionOptions.direction ? -1 : 1;
		let directionLimitSize = direction === 'left' || direction === 'right' ?  paragraphWidth : paragraphHeight;
		let position = directionOptions.direction ? 0 : directionLimitSize * -directionMultiplier;

		function updatePosition() {
			position += speed / 1000; // Adjust the speed by changing the increment value

			if (position >= directionLimitSize) {
				position = 0;
			}

			cloneContainer.style.transform = `${directionOptions.transform}(${position * directionMultiplier}px)`;

			requestAnimationFrame(updatePosition);
		}

		updatePosition();
	});
}

window.addEventListener("load", marquee);
