const computerBtn = document.getElementById("computerBtn");
const friendBtn = document.getElementById("friendBtn");
const bothCompFriendBtns = document.getElementById("opponentChoice");
const onePlayer = document.getElementById("onePlayer");
const twoPlayer = document.getElementById("twoPlayer");
const player1name = document.getElementById("player1name");
const player2name = document.getElementById("player2name");
const startWarBtn = document.getElementById("startWarBtn");
const gameOptionsDiv = document.getElementById("gameOptions");
const overlay = document.getElementById("overlay");
const instructions = document.getElementById("instructions");
let overlayVisible = false;
let player1;
let player2;


// GAME OPTIONS PAGE //

computerBtn.addEventListener("click", chooseComputer);
friendBtn.addEventListener("click", chooseFriend);
startWarBtn.addEventListener("click", startWarGame);

function chooseComputer(){
  bothCompFriendBtns.classList.add("hidden");
  //check if there's a previously used name in storage and add it to input if so
  player1 = localStorage.getItem("player1");
  if(player1){
    player1name.value = player1;
  }
  //show the input field for player 1
  onePlayer.classList.remove("hidden");
  //if there is input already there before keydown - localStorage
  if (player1name.value){
    //...show the start button
    startWarBtn.classList.remove("hidden");
  }
  //listen for keyup and if there is text inside the input, show start button
  player1name.addEventListener("keyup", function(){
    if (this.value.length !== 0){
      startWarBtn.classList.remove("hidden");
    } else {
      startWarBtn.classList.add("hidden");
    }
  })
}

function chooseFriend(){
  bothCompFriendBtns.classList.add("hidden");
  //check if user has played before, and give easy access to names if they'd like to use them again
  player1 = localStorage.getItem("player1");
  if(player1){
    player1name.value = player1;
  }
  player2 = localStorage.getItem("player2");
  if(player2){
    player2name.value = player2;
  }
  //show both input fields
  onePlayer.classList.remove("hidden");
  twoPlayer.classList.remove("hidden");

  //if there is input already there before keydown - localStorage
  if (player1name.value && player2name.value){
    //show the start button
    startWarBtn.classList.remove("hidden");
  }
  //listen for keyup and if both fields have text, show start button
  player2name.addEventListener("keyup", function(){
    if (this.value.length !== 0 && player1name.value.length !==0){
      startWarBtn.classList.remove("hidden");
    } else {
      startWarBtn.classList.add("hidden");
    }
  })
  //same as above, but listening on the player1name field
  player1name.addEventListener("keyup", function(){
    if (this.value.length !== 0 && player2name.value.length !==0){
      startWarBtn.classList.remove("hidden");
    } else {
      startWarBtn.classList.add("hidden");
    }
  })
}

//Materialize tooltip
$(document).ready(function(){
  $('.tooltipped').tooltip();
});

//functions to show how-to-play overlay on click of button
function overlayOn() {
  overlay.style.display = "block";
  overlayVisible = true;
}
function overlayOff() {
  overlay.style.display = "none";
  overlayVisible = false;
}
overlay.addEventListener('click', overlayOff);
instructions.addEventListener('click', overlayOn);

function savePlayerNames(){
  //Pull user input from each field
  player1 = player1name.value;
  player2 = player2name.value;

  //Put names into local storage
  localStorage.setItem("player1", player1);
  if(player2){
    localStorage.setItem("player2", player2)
  }
}


// GAME FUNCTIONALITY
function startWarGame(){
  savePlayerNames();
  gameOptionsDiv.classList.add("hidden");
}