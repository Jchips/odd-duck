'use strict';

// DOM REFERENCES
let imgSection = document.getElementById('img-section');
let viewResultsBtn = document.getElementById('results-btn');

// GLOBAL VARIABLES
let roundsLeft = 25;

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

// Generates a random number (index) within the products array length
// W3 Resources: Math.floor(Math.random()*items.length)
function generateProducts() {
  return Math.floor(Math.random() * STATE.products.length);
}

// Displays 3 random images of the products on the page
function renderProducts() {
  let getImgs = document.querySelectorAll('img');
  let randomImgs = [];

  let indexOne = generateProducts();
  console.log("index 1: " + indexOne); // delete later
  let indexTwo = generateProducts();
  console.log("index 2: " + indexTwo); // delete later
  let indexThree = generateProducts();
  console.log("index 3: " + indexThree); // delete later

  while (indexOne === indexTwo) {
    indexOne = generateProducts();
  }

  while (indexOne === indexThree) {
    indexOne = generateProducts();
  }

  while (indexTwo === indexThree) {
    indexTwo = generateProducts();
  }
 
  randomImgs.push(indexOne);
  randomImgs.push(indexTwo);
  randomImgs.push(indexThree);

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
  let displayResults = document.getElementById('display-results');
  console.log("") // delete later
  roundsLeft--;
  console.log(`Rounds left: ${roundsLeft}`); // delete later
  if (roundsLeft === 0) {
    viewResultsBtn.style.display = "block";
    displayResults.style.display = "block";
    imgSection.removeEventListener('click', handleClick);
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
  let ul = document.getElementById('results-list');
  for(let i = 0; i < STATE.products.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${STATE.products[i].name}: ${STATE.products[i].imgClickedAmount} votes, and was seen ${STATE.products[i].imgShown} times.`
    ul.appendChild(li);
  }
}

// EVENT LISTENERS
imgSection.addEventListener('click', handleClick);
viewResultsBtn.addEventListener('click', handleShowResults);

// FUNCTION CALLS
renderProducts();