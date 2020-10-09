let counter = 0;

function drawSmoke(n) {

	let smoke = `<img src="CLOUDS.svg" class="smoke" onclick="removeSmoke()" style = "top: ${Math.random() * (70 - 20) + 20}%; 
	left: ${Math.random() * (70 - 20) + 20}%;">`;

	counter += n;

	if ( counter > 15 ) {

		removeSmoke ();

	} 

	else smoke = `<img src="CLOUDS.svg" class="smoke" onclick="removeSmoke()"
		style = "top: ${Math.random() * (70 - 20) + 20}%; 
		left: ${Math.random() * (70 - 20) + 20}%;">`;

	let smokeWrapper = document.getElementById("smokeWrapper");

	let div = document.createElement("div");

	div.innerHTML = smoke;

	smokeWrapper.append(div);

}

function removeSmoke () {

	let clouds = document.getElementsByClassName("smoke");

	for ( let cloud of clouds ) {
		cloud.parentElement.remove();
	}

	counter = 0;

}