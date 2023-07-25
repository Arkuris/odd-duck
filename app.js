'use strict';

const products = [];
const image1Element = document.getElementById('image1');
const image2Element = document.getElementById('image2');
const image3Element = document.getElementById('image3');
const productContainer = document.getElementById('Product-container');
const resultButton = document.getElementById('resultButton');

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.timesClicked = 0;
  this.timesSeen = 0;
  products.push(this);
}

new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
// Add the rest of the products...

displayRandomProducts();
console.log(products);

function displayRandomProducts() {
  let randomProductIndex1 = getRandomProductIndex();
  let randomProductIndex2 = getRandomProductIndex();
  let randomProductIndex3 = getRandomProductIndex();

  while (randomProductIndex1 === randomProductIndex2) {
    randomProductIndex2 = getRandomProductIndex();
  }
  while (randomProductIndex2 === randomProductIndex3 || randomProductIndex1 === randomProductIndex3) {
    randomProductIndex3 = getRandomProductIndex();
  }

  image1Element.src = products[randomProductIndex1].src;
  image1Element.alt = products[randomProductIndex1].name;
  image2Element.src = products[randomProductIndex2].src;
  image2Element.alt = products[randomProductIndex2].name;
  image3Element.src = products[randomProductIndex3].src;
  image3Element.alt = products[randomProductIndex3].name;
  products[randomProductIndex1].timesSeen++;
  products[randomProductIndex2].timesSeen++;
  products[randomProductIndex3].timesSeen++;
}

function handleProductClicks(event) {
  if (event.target === productContainer) {
    alert('Please click on a Product');
    return;
  }

  for (let i = 0; i < products.length; i++) {
    if (products[i].name === event.target.alt) {
      products[i].timesClicked++;
      break;
    }
  }
  console.log(products);
  displayRandomProducts();
}

function getRandomProductIndex() {
  return Math.floor(Math.random() * products.length);
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < products.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${products[i].name} had ${products[i].timesSeen} view(s) and was clicked ${products[i].timesClicked} time(s).`;
    ul.appendChild(li);
  }
}

resultButton.addEventListener('click', renderResults);
productContainer.addEventListener('click', handleProductClicks);