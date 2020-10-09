let categoryButtons = document.getElementsByClassName( "categoty-button" );

for ( let categoryButton of categoryButtons ) {

	categoryButton.addEventListener( 'click', categorySwitcherFunc);

}

let subCategoryButtons = document.getElementsByClassName( "subCategoryButtons" );

for ( let subCategoryButton of subCategoryButtons ) {

	subCategoryButton.addEventListener( 'click', subClick);

}

function subClick () {

	let subCatButt = event.target;

	subCatButt.parentElement.parentElement.parentElement.getElementsByClassName("categoty-button")[0].click();

}

function categorySwitcherFunc (event) {

	let catButt = event.target;

	let catName = catButt.innerText.toLowerCase();

	let filter = document.getElementsByClassName( "shop-items-grid" );

	let display = 0;

	for ( let filterItem of filter ) {

		let title = filterItem.getElementsByTagName( "h2" )[0];

		let articlesArray = [document.getElementById('article1'), document.getElementById('article2'), document.getElementById('article3'), document.getElementById('article4')];

		if ( catName.includes('устройства') ) {
			articlesArray[0].style.display = 'block';
			articlesArray[1].style.display = 'none';
			articlesArray[2].style.display = 'none';
			articlesArray[3].style.display = 'none';
		} else if ( catName.includes('жидкости') ) {
			articlesArray[0].style.display = 'none';
			articlesArray[1].style.display = 'block';
			articlesArray[2].style.display = 'none';
			articlesArray[3].style.display = 'none';
		} else if ( catName.includes('атомайзеры') ) {
			articlesArray[0].style.display = 'none';
			articlesArray[1].style.display = 'none';
			articlesArray[2].style.display = 'block';
			articlesArray[3].style.display = 'none';
		} else {
			articlesArray[0].style.display = 'none';
			articlesArray[1].style.display = 'none';
			articlesArray[2].style.display = 'none';
			articlesArray[3].style.display = 'block';
		}

		if ( !title.innerText.toLowerCase().includes(catName) ) {

			filterItem.style.display = "none";

		} 

		else {

			filterItem.style.display = "block";

			display++;

		}

		if ( display > 0 ) {

			filterItem.parentElement.style.display = "flex";

		}

	}
}

let index2 = 0;

function carousel (n) {

	let slides = document.getElementsByClassName("shop-items-grid");

	let slides1 = document.getElementsByClassName("articleInformation");

	for ( let slide of slides ){
		slide.style.display = "none";
	}

	for ( let slide1 of slides1 ){
		slide1.style.display = "none";
	}

	index2 += n;

	if (index2 == slides.length) {
		index2 = 0;
	}

	if (index2 < 0) {
		index2 = slides.length - 1;
	}

	slides[index2].style.display = "block";

	slides1[index2].style.display = "block";

}

carousel (0);

function searchEngine() { 

	let input = document.getElementById( "searchbar" ).value.toLowerCase();

	let filter = document.getElementsByClassName( "shop-items" );

	let display = 0;

	for ( let filterItem of filter ) {

		let title = filterItem.getElementsByTagName( "h3" )[0];

		if ( !title.innerText.toLowerCase().includes(input) ) {

			filterItem.style.display = "none";

		} 

		else {

			filterItem.style.display = "flex";

			display++;

		}

		if ( display > 0 ) {

			filterItem.parentElement.parentElement.style.display = "block";

		}

	}
 
}