/** @format */

const prev = document.querySelector(".testimonial .prev");
const next = document.querySelector(".testimonial .next");

const boxesArray = Array.from(
	document.querySelectorAll(".testimonial  .boxes .box")
);

let currentIndex = 0;

next.onclick = function () {
	currentIndex++;
	if (currentIndex >= boxesArray.length) {
		currentIndex = 0;
	}
	if (currentIndex < boxesArray.length) {
		boxesArray.forEach((box) => {
			box.classList.remove("active");
		});
		boxesArray[currentIndex].classList.add("active");
	}
};

function clickon() {
	next.click();
}

setInterval(clickon, 4000);

prev.onclick = function () {
	if (currentIndex <= 0) {
		currentIndex = boxesArray.length;
	}
	currentIndex--;
	if (currentIndex < boxesArray.length) {
		boxesArray.forEach((box) => {
			box.classList.remove("active");
		});
		boxesArray[currentIndex].classList.add("active");
	}
};
