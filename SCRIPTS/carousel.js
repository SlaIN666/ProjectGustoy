let index1 = 0;

function carousel (n) {

	let slides = document.getElementsByClassName("news");

	for ( let slide of slides ){
		slide.style.display = "none";
	}

	index1 += n;

	if (index1 == slides.length) {
		index1 = 0;
	}

	if (index1 < 0) {
		index1 = slides.length - 1;
	}

	slides[index1].style.display = "block";

}

carousel (0);

