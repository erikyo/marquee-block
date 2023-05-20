function marquee() {
    let selector, speed = 200;
    const marqueeContainer = document.querySelectorAll('marquee_block');
    marqueeContainer.forEach((item) => {
        const clone = item.innerHTML;
        const firstElement: HTMLElement = item.children[0];
        let i = 0;

        item.insertAdjacentHTML("beforeend", clone);
        item.insertAdjacentHTML("beforeend", clone);

        setInterval(function () {
            firstElement.style.marginLeft = `-${i}px`;
            if (i > firstElement.clientWidth) {
                i = 0;
            }
            i = i + speed;
        }, 0);

    })
}
window.addEventListener("load", marquee);
