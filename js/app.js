'use strict';
// window.addEventListener('load', init);

// function init() {
  let imgSection = document.getElementById('img-section');
  let getImgs = document.querySelectorAll('img'); // array

  let roundsLeft = 25;
  // let imgs = [];
//  for(let i = 0; i < getImgs.length; i++) {
//   console.log(getImgs[i]);
//  }

  const STATE = {
    products: [],
  }
  
  // Product constructor
  function Product(name) {
    this.name = name; // maybe change this later
    this.filePath = `img/${name}.jpg`;
    this.imgShown = 0;
    this.imgClickedAmount = 0;

    STATE.products.push(this);
  }

  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogDuck = new Product('dog-duck');

  generateProducts();
  // renderProducts();
// }

// Generates a random number (index) within the products array length (6 or less)
// W3 Resources: Math.floor(Math.random()*items.length)
function generateProducts() {
  return Math.floor(Math.random() * STATE.products.length);
}

function renderProducts() {
  // let imgSection = document.getElementById('img-section');
  let randomImgs = []; // [7, 0, 6];

  let indexOne = generateProducts();
  console.log("index 1: " + indexOne); // delete later
  let indexTwo = generateProducts();
  console.log("index 2: " + indexTwo); // delete later
  let indexThree = generateProducts();
  console.log("index 3: " + indexThree); // delete later

  // makes sure none of the imgs are duplicated
  // while (indexOne === indexTwo || indexOne === indexThree) {
  //   indexOne = generateProducts();

  //   if (indexTwo === indexThree) {
  //     indexTwo = generateProducts();
  //   }
  // }
  // if (indexOne === indexTwo) {
  //   console.log("match 1"); // delete later
  //   while (indexOne === indexTwo) {
  //     indexOne = generateProducts();
  //   }
  // } 
  // if (indexOne === indexThree) {
  //   console.log("match 2"); // delete later
  //   while (indexOne === indexThree) {
  //     indexOne = generateProducts();
  //   }
  // } 
  // if (indexTwo === indexThree) {
  //   console.log("match 3"); // delete later
  //   while (indexTwo === indexThree) {
  //     indexTwo = generateProducts();
  //   }
  // }

  while (indexOne === indexTwo) {
    console.log("match 1"); // delete later
    indexOne = generateProducts();
  }

  while (indexOne === indexThree) {
    console.log("match 2"); // delete later
    indexOne = generateProducts();
  }

  while (indexTwo === indexThree) {
    console.log("match 3"); // delete later
    indexTwo = generateProducts();
  }
 
  randomImgs.push(indexOne);
  randomImgs.push(indexTwo);
  randomImgs.push(indexThree);

  for (let i = 0; i < randomImgs.length; i++) { // [7, 0, 6];
    let img = document.createElement('img');
    getImgs[i].src = STATE.products[randomImgs[i]].filePath;
    getImgs[i].alt = STATE.products[randomImgs[i]].name;
    STATE.products[randomImgs[i]].imgShown++;
    console.log(`${STATE.products[randomImgs[i]].name} shown: ${STATE.products[randomImgs[i]].imgShown}`); // delete later
    imgSection.appendChild(img);
  }
}

function handleClick(event) {
  roundsLeft--;
  console.log(`Rounds left: ${roundsLeft}`); // delete later
  
  let clickedImg = event.target.alt;
  for (let i = 0; i < STATE.products.length; i++) {
    if (clickedImg === STATE.products[i].name) {
      STATE.products[i].imgClickedAmount++;
      console.log(`${STATE.products[i].name} clicked amount: ${STATE.products[i].imgClickedAmount}`);
    }
  }

  renderProducts();
}

imgSection.addEventListener('click', handleClick);

renderProducts();