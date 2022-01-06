const computerBtn = document.getElementById("computerBtn");
const friendBtn = document.getElementById("friendBtn");
const bothCompFriendBtns = document.getElementById("opponentChoice");
const onePlayer = document.getElementById("onePlayer");
const twoPlayer = document.getElementById("twoPlayer");
const player1name = document.getElementById("player1name");
const player2name = document.getElementById("player2name");
const startWarBtn = document.getElementById("startWarBtn");
const gameOptionsDiv = document.getElementById("gameOptions");
const gameContainer = document.getElementById("war-game-container");
const overlay = document.getElementById("overlay");
const instructions = document.getElementById("instructions");
const player1text = document.getElementById("player1");
const player2text = document.getElementById("player2");
const flipCardsBtn = document.getElementById("flipCardBtn");
const card1Img= document.getElementById("card1");
const card2Img = document.getElementById("card2");
let overlayVisible = false;
let player1;
let player2;
let deckID;
let player1Deck;
let player2Deck;


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
  //if single player, save Computer as the second name
  if(player2){
    localStorage.setItem("player2", player2)
  } else {
    localStorage.setItem("player2", "Computer");
  }
}


// GAME FUNCTIONALITY
function startWarGame(){
  savePlayerNames();
  gameOptionsDiv.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  player1text.textContent = localStorage.getItem("player1");
  player2text.textContent = localStorage.getItem("player2");
  var cardDeckURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  fetch(cardDeckURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { 
      deckID = data.deck_id;
      player1Deck = "https://deckofcardsapi.com/api/deck/" + deckID+ "/draw/?count=26";
      player2Deck = "https://deckofcardsapi.com/api/deck/" + deckID+ "/draw/?count=26";
      makePiles();
    }) 
}

function makePiles(){
  Promise.all([
    fetch(player1Deck).then(resp => resp.json()),
    fetch(player2Deck).then(resp => resp.json())
  ]).then(function(data){
    const player1Cards = [];
    const player2Cards = [];
    let card = 0;
    let numCards1 = player1Cards.length;
    let numCards2 = player2Cards.length;
    for(let i=0; i<data[0].cards.length; i++){
      var currentCard1 = data[0].cards[i].code;
      var currentCard2 = data[1].cards[i].code;
      player1Cards.push(currentCard1);
      player2Cards.push(currentCard2);
    }
    function flipCards(){
      
      var card1src = data[0].cards[card].image;
      var card2src = data[1].cards[card].image;
      card1Img.src = card1src;
      card2Img.src = card2src;
      
      //compare two player's card values. Winner pushes the two cards to their array. Loser loses that card from array.
      var card1num = data[0].cards[card].value;
      var card2num = data[1].cards[card].value;
  
      if (card1num === "ACE"){
        card1num = 1;
      } else if (card1num === "JACK") {
        card1num = 11;
      } else if (card1num === "QUEEN"){
        card1num = 12
      } else if (card1num === "KING"){
        card1num = 13;
      } 
      if (card2num === "ACE"){
        card2num = 1;
      } else if (card2num === "JACK") {
        card2num = 11;
      } else if (card2num === "QUEEN"){
        card2num = 12
      } else if (card2num === "KING"){
        card2num = 13;
      }
      card1num = Number(card1num);
      card2num = Number(card2num);
   

      if(card1num > card2num){
        console.log("Player 1 Wins");
      } else if (card1num < card2num){
        console.log("Player 2 Wins");
      } else {
        console.log("WAR");
      }
      //check each array. If length is 0, they lose.
      //highlight winning card in green and brief animation
      //conditional for WAR
      if (numCards1 === 0){

      }
      if (numCards2 === 0){

      }
      card++;
    }
    flipCardsBtn.addEventListener('click', flipCards);
  })
}

