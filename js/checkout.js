//trayendo el string de productos guardado en el local storage
let getLocalStorageString = localStorage.getItem('arrayToString');
//console.log(getLocalStorageString)
//regresando el string a array
let fromStingToArray = JSON.parse(getLocalStorageString);
//console.log(fromStingToArray);


function calculateTotal(array) {
  //declarando la variable que guardara la suma total de precios
  let totalSumOfProducts = 0;
  //decalarando la variable del template 
  let template = ' ';
  //iterando en el arreglo 
  let products = array;
  array.forEach(product => {
    //guardando la el nombre y precio de los productos en el carrito
    let productName = product.title;
   // console.log(productName);
    let productPrice = product.price;
   // console.log(productPrice);
    //haciendo la suma de precios a pagar y guardandola en la suma total
    totalSumOfProducts += productPrice
    //console.log(totalSumOfProducts);

    //colocando la información de productos en template
    template = `
 <th scope="row">${productName}</th>
 <td>${productPrice}<td>
 `
    //creando row para la tabla (para colocar el template)
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = template;
    //llamando el contenedor de la tabla de productos y la fila del total total
    let tableContainer = document.getElementById('table-body');
    let totalRow = document.getElementById('total-row');
    //agregando template de productos antes del precio total
    tableContainer.insertBefore(tableRow, totalRow);
  });//llamando el contenedor del precio total
  let totalPrice = document.getElementById('total-container');
  totalPrice.innerHTML = totalSumOfProducts;

}
calculateTotal(fromStingToArray);

let totalPrice = document.getElementById('total-container');
console.log(totalPrice);
let priceText = totalPrice.innerText;
console.log(priceText);

paypal.Button.render({
  env: 'sandbox', // sandbox | production
  // PayPal Client IDs - replace with your own
  // Create a PayPal app: https://developer.paypal.com/developer/applications/create
  client: {
      sandbox:    'AaJEPDYgciiG2Vk-G_6NvNJfUCKrCODxyZqAJabhXhi9VVGDPa3Z3-f7j79O90cX2T9_ZJ_liTxavThs',
      production: '<insert production client id>'
  },
  // Show the buyer a 'Pay Now' button in the checkout flow
  commit: true,
  // payment() is called when the button is clicked
  payment: function(data, actions) {
      // Make a call to the REST api to create the payment
      return actions.payment.create({
          payment: {
              transactions: [
                  {
                    
                      amount: { total: priceText, currency: 'USD' }
                  }
              ]
          }
      });
  },
   // onAuthorize() is called when the buyer approves the payment
   onAuthorize: function(data, actions) {
      // Make a call to the REST api to execute the payment
      return actions.payment.execute().then(function() {
          window.alert('Payment Complete!');
      });
  }
}, '#paypal-button-container');