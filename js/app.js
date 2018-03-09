//declarando el arreglo de productos seleccionados por el usuario 
let cartArray = [];

function drawProducts(data) {
  let products = data.products;
  let productsContainer = document.getElementById("products-container");
  products.forEach((product, index) => {
    let productHTML = createProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
}

function createProductHTML(product) {
  let template = `
    <h3>${product.title}</h3>
    <img src='${product.imageUrl}' alt='${product.description}'/>
    <p>${product.description}</p>
    <button id="${product.id}" data-product-id=${product.id}
      onclick="changeButtonStatus(${product.id})"
      class='btn btn-primary'>
        Agregar a carrito
      </button>
    <hr/>
  `;
  let productContainer = document.createElement("div");
  productContainer.className = "col text-center";
  productContainer.innerHTML = template;
  return productContainer;
}

drawProducts(data);

function addToCart(id) {
  //guardando el producto con el id seleccionado 
  let selectedProduct = data.products[id];
  //agregando el producto al array de productos seleccionados
  cartArray.push(selectedProduct);
  //console.log(cartArray);
  //guardando el array de productos en local storage
  localStorage.setItem('arrayToString', JSON.stringify(cartArray));
  //llamamos la función para aumentar el contador del carrito
  increaseCounter();
}

function removeFromCart() {
  /* cuando agrego a carrito, tengo que:
  1) Decrementar en uno mi contador del menu
  2) Borrar mi producto de algun lugar
  3) Cambiar el boton de quitar del carrito
  por agregar a carrito
  */
}

function increaseCounter() {
  //llamamos al contenedor del contador 
  let counterContainer = document.getElementById('counter-items');
  //obtenemos el array guardado en local storage
  let storedData = localStorage.getItem('arrayToString');
  //regresando el string a array
  let stringToArray = (JSON.parse(storedData));
  //contando los productos del array
  let totalItems = stringToArray.length;
  //console.log(totalItems);
  //añadiendo cantidad de productos al contenedor
  counterContainer.innerText = totalItems;

}

function decreaseCounter() {
  /* como accedemos al HTML del contador
  y como lo incrementamos*/
}

function changeButtonStatus(idButton) {
  console.log(idButton)
  //llamando al botón que fue clickado mediante su id
  let clickedBtn = document.getElementById(idButton);
  console.log(clickedBtn);
  //haciendo comparación del texto del boton seleccionado
  if (clickedBtn.innerText === 'Agregar a carrito') {
    //si el texto es agregar... cambiar el texto quitar...
    //y llamar la funcion addToCart
    //console.log('dice agregar')
    addToCart(clickedBtn.id);
    clickedBtn.innerText = 'Quitar del carrito';

    //console.log(clickedBtn.id );
  } else {
    // console.log('dice quitar')
    //de otra forma añadir el texto agregar... y llamar 
    //la función remove from cart
    removeFromCart(clickedBtn.id);
    clickedBtn.innerText = 'Agregar a carrito';

  }

}
