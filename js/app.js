'use strict';

// DOM REFERENCES
let imgSection = document.getElementById('img-section');
let viewResultsBtn = document.getElementById('results-btn');
let resetDataBtn = document.getElementById('reset-btn');

// GLOBAL VARIABLES
let roundsLeft = 5;
let imagesIndices = [];

const STATE = {
  products: [],
}

// PRODUCT CONSTRUCTOR
function Product(name, fileExtension = 'jpg') {
  this.name = name; // maybe change this later
  this.filePath = `img/${name}.${fileExtension}`;
  this.imgShown = 0;
  this.imgClickedAmount = 0;

  STATE.products.push(this);
}

// PRODUCT INSTANCES
if (localStorage.getItem('odd duck')) {
  let data = JSON.parse(localStorage.getItem('odd duck'));
  STATE.products = data;
} else {
  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogDuck = new Product('dog-duck');
  let dragon = new Product('dragon');
  let pen = new Product('pen');
  let petSweep = new Product('pet-sweep');
  let scissors = new Product('scissors');
  let shark = new Product('shark');
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let waterCan = new Product('water-can');
  let wineGlass = new Product('wine-glass');
}

// Generates a random number (index) within the products array length
// W3 Resources: Math.floor(Math.random()*items.length)
function generateProducts() {
  return Math.floor(Math.random() * STATE.products.length);
}

// Displays 3 random images of the products on the page
function renderProducts() {
  let getImgs = document.querySelectorAll('.product-img');
  let randomImgs = [];

  let indexOne = generateProducts();
  console.log("index 1: " + indexOne); // delete later
  let indexTwo = generateProducts();
  console.log("index 2: " + indexTwo); // delete later
  let indexThree = generateProducts();
  console.log("index 3: " + indexThree); // delete later

  while (imagesIndices.length < 6) {
    let index = generateProducts();
  
    if (imagesIndices.includes(index)) {
      index = generateProducts();
    } else {
      imagesIndices.push(index);
    }
  }

  for (let i = 0; i < 3; i++) {
    randomImgs.push(imagesIndices.shift());
  }

  // puts the 3 random images on the index page
  for (let i = 0; i < randomImgs.length; i++) {
    getImgs[i].src = STATE.products[randomImgs[i]].filePath;
    getImgs[i].alt = STATE.products[randomImgs[i]].name;
    STATE.products[randomImgs[i]].imgShown++;
    console.log(`${STATE.products[randomImgs[i]].name} shown: ${STATE.products[randomImgs[i]].imgShown}`); // delete later
  }
}

// Displays another random 3 images when user clicks (votes on) one of the images
function handleClick(event) {
  console.log("") // delete later
  roundsLeft--;
  console.log(`Rounds left: ${roundsLeft}`); // delete later
  if (roundsLeft === 0) {
    viewResultsBtn.style.display = "block";
    imgSection.removeEventListener('click', handleClick);

    let data = JSON.stringify(STATE.products);
    localStorage.setItem('odd duck', data);
  }

  let clickedImg = event.target.alt;

  // keeps track of how many times the clicked image was voted on in total
  for (let i = 0; i < STATE.products.length; i++) {
    if (clickedImg === STATE.products[i].name) {
      STATE.products[i].imgClickedAmount++;
      console.log(`${STATE.products[i].name} clicked amount: ${STATE.products[i].imgClickedAmount}`); // delete later
    }
  }

  renderProducts();
}

// displays the final results when user presses the 'view results button
function handleShowResults(event) {
  viewResultsBtn.removeEventListener('click', handleShowResults);
  viewResultsBtn.style.display = 'none'; // Makes button disappear
  resetDataBtn.style.display = 'block';
  let ul = document.getElementById('results-list');
  for(let i = 0; i < STATE.products.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${STATE.products[i].name}: ${STATE.products[i].imgClickedAmount} votes, and was seen ${STATE.products[i].imgShown} times.`
    ul.appendChild(li);
  }

  renderChart();
}

// displays the chart
function renderChart() {
  const ctx = document.getElementById('chart');
  const h2 = document.getElementById('bar-chart-header');
  h2.style.display = 'block';

  let productNames = [];
  let totalVotes = [];
  let imgShownAmount = [];

  for (let i = 0; i < STATE.products.length; i++) {
    productNames.push(STATE.products[i].name);
    totalVotes.push(STATE.products[i].imgClickedAmount);
    imgShownAmount.push(STATE.products[i].imgShown);
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: totalVotes,
        borderWidth: 1,
        backgroundColor: '#51cf66'
        // backgroundColor: '#FF5733'
      },
      {
        label: '# of Times Shown',
        data: imgShownAmount,
        borderWidth: 1,
        backgroundColor: '#4dabf7'
        // backgroundColor: '#8817d4'
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

// clears all the data from local storage and reloads the page
function handleResetData () {
  localStorage.clear();
  location.reload(true);
}

// EVENT LISTENERS
imgSection.addEventListener('click', handleClick);
viewResultsBtn.addEventListener('click', handleShowResults);
resetDataBtn.addEventListener('click', handleResetData);

// FUNCTION CALLS
renderProducts();