if (document.readyState == 'loading') {

	document.addEventListener('DOMContentLoaded', ready);

} else {

	ready();

}

function ready () {

	let removeButtons = document.getElementsByClassName( "delete" );

	let plusQuantityButtons = document.getElementsByClassName( "quantity-button-plus" );

	let minusQuantityButtons = document.getElementsByClassName( "quantity-button-minus" );

	let addToCartButtons = document.getElementsByClassName( "add-to-cart-button" );

	for ( let removeButton of removeButtons ) {

		removeButton.addEventListener( 'click', removeCartItem);

	}

	for ( let plusQuantityButton of plusQuantityButtons ) {

		plusQuantityButton.addEventListener( 'click', plusQuantity);

	}

	for ( let minusQuantityButton of minusQuantityButtons ) {

		minusQuantityButton.addEventListener( 'click', minusQuantity);

	}

	for ( let addToCartButton of addToCartButtons ) {

		addToCartButton.addEventListener( 'click', addToCartClicked);

	}

	document.getElementById("orderButton").addEventListener('submit', purchaseClicked);

	document.getElementsByClassName("order")[0].addEventListener('click', showOrderForm);

}

function showOrderForm () {

	let orderForm = document.getElementsByClassName("order-form-wrapper")[0];

	orderForm.style.display = "flex";

}

function purchaseClicked () {

	let shopCartItemsWrapper = document.getElementsByClassName("shop-cart-items-wrapper")[0];

	while ( shopCartItemsWrapper.hasChildNodes() ) {

		shopCartItemsWrapper.removeChild( shopCartItemsWrapper.firstChild );

	}

	updateTotalCount ();

}

function addToCartClicked (event) {

	let buttonAddToCart = event.target;

	let shopItem = buttonAddToCart.parentElement.parentElement;

	let title = shopItem.getElementsByTagName( "h3" )[0].innerText;

	let price = shopItem.getElementsByClassName( "price" )[0].innerText;

	let imgSrc = shopItem.getElementsByTagName( "img" )[0].src;

	addItemToCart(title, price, imgSrc);

	updateTotalCount();

}

function addItemToCart(title, price, imgSrc) {

	let shopCartItem = document.createElement("div");

	shopCartItem.classList.add("shop-cart-item");

	let shopCart = document.getElementsByClassName("shop-cart-items-wrapper")[0];

	let shopCartNames = shopCart.getElementsByTagName( "h3" );

	for ( let shopCartName of shopCartNames ) {

		if ( shopCartName.innerText == title ) {
			return;
		}

	}

	let newCartItem = `
		<button class="delete" name="delete-button" type="button">&#x274C</button>

		<div class="shop-cart-image">
			
			<img src="${imgSrc}">

		</div>

		<div class="shop-cart-item-info">
				
			<h3>${title}</h3>

		</div>

		<div class="shop-cart-quantity-buttons">
				
			<button class="quantity-button-plus quantity-button" name="plus-button" type="button">&#x2b</button>

			<input class="cartItemsQuantity" type="text" name="quantity-input" value="1">

			<button class="quantity-button-minus quantity-button" name="minus-button" type="button">&#x2212</button>

		</div>

		<div class="total-price">
				
			<p class="price-of-item">${price}</p>

		</div> `;

	shopCartItem.innerHTML = newCartItem;

	shopCart.append(shopCartItem);

	shopCartItem.getElementsByClassName("delete")[0].addEventListener('click', removeCartItem);

	shopCartItem.getElementsByClassName("quantity-button-plus")[0].addEventListener('click', plusQuantity);

	shopCartItem.getElementsByClassName("quantity-button-minus")[0].addEventListener('click', minusQuantity);


	let shopclouds = `<img src="CLOUDS.svg" class="shop-clouds" style = "width: 100px; height: 100px; top: 70%; left: 10%;">`;

	let cloudsWrapper = document.getElementById("cloudsWrapper");

	let div = document.createElement("div");

	div.innerHTML = shopclouds;

	cloudsWrapper.append(div);

	new Promise ( resolve => {

		setTimeout( () => {

			let cloudsAnim = document.getElementsByClassName("shop-clouds")[0];

			cloudsAnim.style.animation = "anim 0.7s ease-in";		

			cloudsAnim.addEventListener( 'animationend', function handler () {

				cloudsAnim.removeEventListener( 'animationend', handler );

				resolve(cloudsAnim);

			});

		}, 0);

	}).then( function(result) { result.parentElement.remove(); } );

}

function plusQuantity (event) {

	let plusQuantityButton = event.target;

	let cartItemsQuantity = plusQuantityButton.parentElement.getElementsByClassName( "cartItemsQuantity" )[0];

	let ItemQuantity = Number.parseInt ( cartItemsQuantity.value );

	ItemQuantity += 1;

	if ( isNaN(ItemQuantity) ) ItemQuantity = 1;

	cartItemsQuantity.value = ItemQuantity;

	updateTotalCount();

}

function minusQuantity (event) {

	let plusQuantityButton = event.target;

	let cartItemsQuantity = plusQuantityButton.parentElement.getElementsByClassName( "cartItemsQuantity" )[0];

	let ItemQuantity = Number.parseInt ( cartItemsQuantity.value );

	ItemQuantity -= 1;

	if ( ItemQuantity < 1 || isNaN(ItemQuantity) ) ItemQuantity = 1;

	cartItemsQuantity.value = ItemQuantity;

	updateTotalCount();

}

function removeCartItem (event) {

	let buttonClicked = event.target;

	buttonClicked.parentElement.remove();

	updateTotalCount();

}

function updateTotalCount() {

	let shopCart = document.getElementsByClassName( "shop-cart" )[0];

	let cartItems = shopCart.getElementsByClassName( "shop-cart-item" );

	let total = 0;

	for ( let cartItem of cartItems ) {

		let cartItemsPrice = cartItem.getElementsByClassName( "price-of-item" )[0];

		let cartItemsQuantity = cartItem.getElementsByClassName( "cartItemsQuantity" )[0];

		let price = parseFloat(cartItemsPrice.innerText.replace( '₽', '' ));

		let quantity = cartItemsQuantity.value;

		total += ( price * quantity );

	}

	total = Math.round( total * 100 ) / 100;

	document.getElementsByClassName(" cart-total-price ")[0].innerText = '₽ ' + total;

}

let chatBotViewButton = document.querySelector('.chat-icon')
chatBotViewButton.addEventListener('click', () => {
	let chatBot = document.querySelector('#chatbot')
	chatBot.style.display == 'block' ? chatBot.style.display = 'none' : chatBot.style.display = 'block'
})