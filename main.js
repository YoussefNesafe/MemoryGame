//Select The span for Show name
let name = document.querySelector(".name span");

//Select The start game button and set a click function
document.querySelector(".control-buttons span").onclick = function () {
  //Prompt Window to ask for name
  let yourName = prompt("Whats Your Name?");

  //if name is Empty
  if (yourName == null || yourName == "") {
    name.innerHTML = "Unkwno!";
  } else {
    //Set Name to Your Name
    name.innerHTML = yourName;
  }

  //Remove Splash Screen

  document.querySelector(".control-buttons").remove();
  timeOut();
};

//Timer
function timeOut() {
  let time = document.querySelector(".info-container .timer span");
  var i = 0,
    x = 0;
  setInterval(function () {
    i++;
    if (x < 10) {
      if (i > 0 && i < 10) {
        time.innerHTML = "0" + x + ":0" + i;
      }
      if (i >= 10 && i < 60) {
        time.innerHTML = "0" + x + ":" + i;
      } else if (i == 60) {
        x += i / 60;
        i = 0;
        time.innerHTML = "0" + x + ":0" + i;
      }
    } else {
      if (i > 0 && i < 10) {
        time.innerHTML = x + ":0" + i;
      }
      if (i >= 10 && i < 60) {
        time.innerHTML = x + ":" + i;
      } else if (i == 60) {
        x += i / 60;
        i = 0;
        time.innerHTML = x + ":0" + i;
      }
    }
  }, 1000);
}

//Effect Duration
let duration = 1000;

//Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
//Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

//Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];
//Or Use This Methid To Create The Range >> let orderRange = Array.from((blocks.length).keys());

//Use The Shuffle Function
Shuffle(orderRange);

//Add Order Css Property To GAme Blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  //Add Click Event
  block.addEventListener("click", function () {
    //Trigger The Flip Block Function
    flipBlock(block);
  });
});

//Flip Block Function
function flipBlock(selectedBlock) {
  //Add Class is flipped
  selectedBlock.classList.add("is-flipped");

  //Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  //If There is two Selected Blocks
  if (allFlippedBlocks.length == 2) {
    //Stop Clicking Function
    stopClicking();

    //Check Matched Blocks Function

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//Stop Clicking Function
function stopClicking() {
  //Add class No Clickin On main container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    //Remove Class No clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triseElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    // Add Class has-match
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triseElement.innerHTML = parseInt(triseElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

//Shuffle Function
function Shuffle(array) {
  //Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    //Get Random Number
    random = Math.floor(Math.random() * current);

    //Decrease  Length By One
    current--;

    //Swap The Element In Array
    //[1] Save Current Element In Temp
    temp = array[current];
    //[2] Current Element = Random Element
    array[current] = array[random];
    //[3] Random Element = Get Element From Temp
    array[random] = temp;
  }
  return array;
}
