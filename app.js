'use strict';

const products = [];
const image1Element = document.getElementById('image1');
const image2Element = document.getElementById('image2');
const image3Element = document.getElementById('image3');
const productContainer = document.getElementById('product-container');
const resultButton = document.getElementById('resultButton');
const canvasChart = document.getElementById('myChart');
let rounds = 25;
let clicks = 0;
let maxClicksAllowed = 25;

const state = {
  allProductsArray: [],
  indexArray: [],
};


function Product(name, src) {
  this.name = name;
  this.src = src;
  this.timesClicked = 0;
  this.timesSeen = 0;
  products.push(this);
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');



displayRandomProducts();
console.log(products);

function displayRandomProducts() {
  let randomProductIndex1 = getRandomProductIndex();
  let randomProductIndex2 = getRandomProductIndex();
  let randomProductIndex3 = getRandomProductIndex();
  // Checking to make sure index values are not duplicated.
  while (randomProductIndex1 === randomProductIndex2) {
    randomProductIndex2 = getRandomProductIndex();
  }
  while (randomProductIndex2 === randomProductIndex3 ||
     randomProductIndex1 === randomProductIndex3) {
    randomProductIndex3 = getRandomProductIndex();
  }

  image1Element.src = products[randomProductIndex1].src;
  image1Element.alt = products[randomProductIndex1].name;
  image2Element.src = products[randomProductIndex2].src;
  image2Element.alt = products[randomProductIndex2].name;
  image3Element.src = products[randomProductIndex3].src;
  image3Element.alt = products[randomProductIndex3].name;
  products[randomProductIndex1].timesSeen++;   // Increment the timesSeen property for each displayed product.
  products[randomProductIndex2].timesSeen++;
  products[randomProductIndex3].timesSeen++;
}

function handleProductClicks(event) {
  if (event.target === productContainer) {
    alert('Please click on a Product');
    return;
  }
  if (rounds > 0) {
  // add 1 to the pridunt in the array that twas clicked on
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === event.target.alt) {
        products[i].timesClicked++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      productContainer.removeEventListener('click', handleProductClicks);
      productContainer.className = 'no-voting';
      renderChart();
    } else {
      displayRandomProducts();
    }
  }
}

//     console.log(products);
//     // add 3 new images once clicked
//     displayRandomProducts();
//     rounds--;
//   } else {
//     alert('No more votes.');
//     productContainer.removeEventListener('click', handleProductClicks);
//   }
// }


function getRandomProductIndex() {
  return Math.floor(Math.random() * products.length);
}

// function renderResults() {
//   let ul = document.querySelector('ul');
//   let lis = document.querySelectorAll('li');
//   if (lis.length) {
//     console.log('WE ALREADY HAVE A LIST!!!');
//     // we know there are list items on the page.

//     // update the existing lis.
//   }
//   for (let i = 0; i < products.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${products[i].name} had ${products[i].timesSeen} view(s) and was clicked ${products[i].timesClicked} time(s).`;
//     ul.appendChild(li);
//   }
// }

resultButton.addEventListener('click', () => {
  // renderResults();
  renderChart();
});
// resultButton.addEventListener('click', renderResults);
productContainer.addEventListener('click', handleProductClicks);

function renderChart() {
  let productNames = [];
  let productLikes = [];
  let productViews = [];

  for (let i = 0; i < state.allProductsArray.length; i++) {
    productNames.push(state.allProductsArray[i].name);
    productLikes.push(state.allProductssArray[i].timesClicked);
    productViews.push(state.allProductsArray[i].timesSeen);
  }

  /* refer to Chart.js > Chart Types > Bar Chart: 
  https://www.chartjs.org/docs/latest/charts/bar.html 
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */
  return new Chart (canvasChart, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Likes',
        data: productLikes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      }, {
        label: 'Views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgb(255, 159, 64)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    } 
  });
}


