let orderform = document.getElementById('formOrder');

orderform.addEventListener('submit', async (e) => {
  e.preventDefault();

  let map = new Map();

  for( let item of document.getElementsByClassName('shop-cart-item') ) {

    map.set(item.getElementsByClassName('shop-cart-item-info')[0].innerText, item.getElementsByClassName('cartItemsQuantity')[0].value);

  }

  let formData = new FormData(orderform);

  for ( let [key, value] of formData.entries()) {
    map.set(key, value);
  }

  map.set('total cost', document.getElementsByClassName('cart-total-price')[0].innerText);

  let jsonMap = JSON.stringify([...map]);

  let orderRes = await fetch('http://localhost:3000/order', {
    method: 'POST',
    body: jsonMap
  });

  await orderRes.json();

  document.getElementsByClassName('thanksWindowWrapper')[0].style.display = 'block';

  setTimeout( () => {document.getElementsByClassName('thanksWindowWrapper')[0].style.display = 'none';}, 2000 );

})

document.querySelector('#phoneInput').addEventListener('input', () => {

  let value = document.querySelector('#phoneInput').value

  console.log(value)

  if ((value[value.length-1] >= '0' && value[value.length-1] <= '9') || value[value.length-1] == '+' || value[value.length-1] == '(' || value[value.length-1] == ')' || value[value.length-1] == '-' || value[value.length-1] == 'ArrowLeft' || value[value.length-1] == 'ArrowRight' ||  value[value.length-1] == 'Delete' || value[value.length-1] == 'Backspace') {
    document.querySelector('#phoneInput').value = value
  } 
  else document.querySelector('#phoneInput').value = value.slice(0,value.length-1)
})