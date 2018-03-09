//trayendo el string de productos guardado en el local storage
let getLocalStorageString = localStorage.getItem('arrayToString');
//console.log(getLocalStorageString)
//regresando el string a array
let fromStingToArray = JSON.parse(getLocalStorageString);
//console.log(fromStingToArray);


function calculateTotal(array) {
//declarando la variable que guardara la suma total de precios
  let totalSumOfProducts = 0;
  //iterando en el arreglo 
  let products = array;
array.forEach(product => {
  //guardando la el nombre y precio de los productos en el carrito
 let productName = product.title;
 console.log(productName);
 let productPrice = product.price;
 console.log(productPrice);
 //haciendo la suma de precios a pagar y guardandola en la suma total
 totalSumOfProducts += productPrice

})
  
}
 calculateTotal(fromStingToArray);