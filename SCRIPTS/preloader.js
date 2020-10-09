window.onload = function () {

	document.querySelector("#preloader").style.display = 'none'

	document.body.style.overflowY = 'visible'

	const cursor = document.querySelector(".cursor");
	const cursorInner = document.querySelector(".cursor-inner");

	document.addEventListener('mousemove', event => {

		let left = event.pageX
		let top = event.pageY
		let scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		  )

		if (left < document.body.getBoundingClientRect().left + 10) left = document.body.getBoundingClientRect().left + 12
		if (top < document.body.getBoundingClientRect().top + 10) top = document.body.getBoundingClientRect().top + 12
		if (top + 20 > scrollHeight) top = scrollHeight - 22

		cursor.setAttribute("style", "top: " + (top - 10) + "px; left: " + (left - 10) + "px;");
		cursorInner.setAttribute("style", "top: " + (top - 1) + "px; left: " + (left - 1) + "px;");

		cursor.style.display = 'block'
		cursorInner.style.display = 'block'

	});

	document.addEventListener('click', () => {

		let checkbox = document.querySelector('.menu').firstElementChild

		if (checkbox.checked) document.body.style.overflowY = 'hidden'
		else document.body.style.overflowY = 'visible'

		cursor.classList.add("expand");
		cursorInner.classList.add("expand-inner");

		setTimeout(() => {
			cursor.classList.remove("expand");
			cursorInner.classList.remove("expand-inner");
		}, 200);

	});

}