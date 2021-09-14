const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const ratingCount = product.rating.count;
    const ratingRate = product.rating.rate;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src="${image}"></img>
      </div>
      <h3>${product.title}</h3>
      <p class='box-design'>Category: <span>${product.category}</span></p>
      <p class='box-design'>Rating Count: <span>${ratingCount}</span><p>
      <p class='box-design'>Rating Rate: <span>${ratingRate}</span><p>
      <h2 class='box-design'>Price: $ <span>${product.price}</span></h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success custom-design-1">add to cart</button>
      <button id="details-btn" onclick="detailsInfo(${product.id})" class="btn btn-danger custom-design">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

const detailsInfo = id =>{
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => productDetails(data))
}

const productDetails = products =>{
  const productInfo = document.getElementById('product-detail');
  productInfo.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `
  <h2>Product Details</h2>
  <h4>Name: ${products.title}</h4>
  <h4>Price:$ ${products.price}</h4>
   <h4>Price:${products.category}</h4>
   <p>Description: ${products.description}</p>
  `
  productInfo.appendChild(div);
 
}