function marquee() {
	const selector = '.marquee_block';
	const marqueeContainers:NodeListOf<HTMLElement> = document.querySelectorAll(selector);
	marqueeContainers.forEach((item: HTMLElement) => {
		let speed = parseInt(item?.dataset?.marqueeSpeed ?? "200");
		const clone = item.innerHTML;
		const firstElement = item.children[0];
		let i = 0;

		// Calculate the width of the item and screen
		const tempElement = document.createElement('div');
		tempElement.innerHTML = clone;
		document.body.appendChild(tempElement);
		const itemWidth = tempElement.offsetWidth;
		document.body.removeChild(tempElement);
		const screenWidth = window.innerWidth || document.documentElement.clientWidth;
		const repeatCount = Math.ceil(screenWidth / itemWidth);

		// Repeat the item to fill the screen
		for (let j = 0; j < repeatCount; j++) {
			item.insertAdjacentHTML("beforeend", clone);
		}

		// Set transition and transform properties
		item.style.width = `${itemWidth * repeatCount}px`;
		item.style.transition = `transform ${speed / 1000}s linear`;

		// Start the animation
		setInterval(function () {
			i += speed;
			item.style.transform = `translateX(-${i}px)`;

			// Reset the position if the animation reaches the width of the clone element
			if (i >= itemWidth) {
				i = 0;
				item.style.transform = `translateX(0)`;
			}
		}, speed);
	});
}

window.addEventListener("load", marquee);
