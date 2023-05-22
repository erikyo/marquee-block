function getSpanItemWidth(el: HTMLElement) {
	// make a copy of the element
	const clone = el.cloneNode(true) as HTMLElement;
	clone.style.height = "0";
	clone.style.display = 'inline-block';
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
			return false
		case 'right':
		default:
			return true
	}
}

function marquee() {
	const selector = '.marquee-block';
	const marqueeContainers:NodeListOf<HTMLElement> = document.querySelectorAll(selector);
	marqueeContainers.forEach((originalParagraph: HTMLElement) => {
		let speed = parseInt(originalParagraph?.dataset?.marqueeSpeed ?? "200");
		let direction = String(originalParagraph?.dataset?.marqueeDirection ?? "left");

		// Get the inner text
		const text = originalParagraph.innerHTML;

		// create an inner wrapper for the text
		const cloneContainer = document.createElement('span');
		cloneContainer.classList.add('marquee-block-inner');

		// the clone of the single paragraph
		const cloneElement = document.createElement('span');
		cloneElement.innerHTML = text;

		// Calculate the width of the item and screen
		const textWidth = getSpanItemWidth(originalParagraph);
		const paragraphWidth = originalParagraph.clientWidth || window.innerWidth || document.documentElement.clientWidth;
		const repeatCount = Math.ceil(paragraphWidth / textWidth) + 1;

		// Repeat the item to fill the screen
		for (let j = 0; j < repeatCount; j++) {
			// Append the clone after the item
			cloneContainer.innerHTML += text;
		}

		// replace the content of originalParagraph with the cloneContainer
		originalParagraph.innerHTML = '';
		originalParagraph.appendChild(cloneContainer);

		// parse the direction options
		const toRight = getDirectionOptions(direction);

		// Set the speed of the marquee
		let directionMultiplier = toRight ? 1 : -1;

		// Set the start and end position
		let initialPosition = toRight ? textWidth * -directionMultiplier : 0;
		let position = initialPosition;

		function updatePosition() {
			const positionSpeed = speed / 1000; // Adjust the speed by changing the increment value

			if (toRight) {
				position = position + positionSpeed;

				if (position >= 0) {
					position = initialPosition;
				}
			} else {
				position = position - positionSpeed;

				if (position <= -textWidth) {
					position = initialPosition;
				}
			}

			cloneContainer.style.transform = `translateX(${position}px)`;

			requestAnimationFrame(updatePosition);
		}

		updatePosition();
	});
}

window.addEventListener("load", marquee);
