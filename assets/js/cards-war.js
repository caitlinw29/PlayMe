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
let losingCard;
let winningCard;


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
  //save player names, adjust what is visible on the page, and put the names in the name text areas
  savePlayerNames();
  gameOptionsDiv.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  player1text.textContent = localStorage.getItem("player1");
  player2text.textContent = localStorage.getItem("player2");
  //grab a deck from the deck of cards api
  var cardDeckURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  fetch(cardDeckURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) { 
      //store the current id to use the same deck for following calls
      deckID = data.deck_id;
      player1Deck = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=26";
      player2Deck = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=26";
      //use the urls above to make two hands of 26 cards each from the same deck of 52
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
    //will be used to increment the place in the array when flipping a card
    let card1 = 0;
    let card2 = 0;
    var numCards1 = player1Cards.length;
    var numCards2 = player2Cards.length;
    //set up the arrays to hold the codes of the cards
    for(let i=0; i<data[0].cards.length; i++){
      var codeCard1 = data[0].cards[i].code;
      var codeCard2 = data[1].cards[i].code;
      player1Cards.push(codeCard1);
      player2Cards.push(codeCard2);
    }
    //on click of the flip cards button
    function flipCards(){
      console.log(player1Cards);
      console.log(player2Cards);
      //if we are at the end of the deck, loop back to the start of the array
      if(card1 === numCards1-1){
        card1 = 0;
      }
      if(card2 === numCards2-1){
        card2 = 0;
      }
      //set up images to hold the current card for each player
      var card1src = data[0].cards[card1].image;
      var card2src = data[1].cards[card2].image;
      card1Img.src = card1src;
      card2Img.src = card2src;
      //add alt text ie "2 HEARTS"
      card1Img.alt = data[0].cards[card1].value + " " + data[0].cards[card1].suit;
      card2Img.alt = data[1].cards[card2].value + " " + data[1].cards[card2].suit;

      //flip cards animation, flip will occur on click of the button to show the card
      $(".flip-card-inner").css("transform", "rotateY(180deg)");
      
      //compare two player's card values
      //Plain variable is the string holding either a number or KING, QUEEN, JACK, or ACE
      var card1numPlain = data[0].cards[card1].value;
      var card2numPlain = data[1].cards[card2].value;
      //we want to grab the corresponding number
      let card1num;
      let card2num; 
      if (card1numPlain === "ACE"){
        card1num = 1;
      } else if (card1numPlain === "JACK") {
        card1num = 11;
      } else if (card1numPlain === "QUEEN"){
        card1num = 12
      } else if (card1numPlain === "KING"){
        card1num = 13;
      } else {
        card1num = Number(card1numPlain);
      }
      //player 2's numbers
      if (card2numPlain === "ACE"){
        card2num = 1;
      } else if (card2numPlain === "JACK") {
        card2num = 11;
      } else if (card2numPlain === "QUEEN"){
        card2num = 12
      } else if (card2numPlain === "KING"){
        card2num = 13;
      } else {
        card2num = Number(card2numPlain);
      }
      //wait 3 seconds after button is clicked, and then flip the card back over (show 'back' of next card)
      setTimeout(function() {
        $(".flip-card-inner").css("transform", "rotateY(0deg)");
      }, 3000)
      //conditionals for winning and losing the match
      //player1 wins the two cards
      if(card1num > card2num){
        losingCard = data[1].cards[card2].code;
        winningCard = data[0].cards[card1].code;
        //remove the losing card from player 2's hand
        removeElement(player2Cards, losingCard);
        //and give it to player 1
        addElement(player1Cards, winningCard, losingCard)
        console.log(player1Cards);
        console.log(player2Cards);
        // add highlighting around a second after the card shows, then remove it after another second
        setTimeout(() => {card1Img.classList.add("highlight")}, 1200);
        setTimeout(() => {card1Img.classList.remove("highlight")}, 2200);
      } else if (card1num < card2num){ //player 2 wins the two cards
        losingCard = data[0].cards[card1].code;
        winningCard = data[1].cards[card2].code;
        removeElement(player1Cards, losingCard);
        addElement(player2Cards, winningCard, losingCard)
        console.log(player1Cards);
        console.log(player2Cards);
        setTimeout(() => {card2Img.classList.add("highlight")}, 1200);
        setTimeout(() => {card2Img.classList.remove("highlight")}, 2200);
      } else { //tie and war breaks out per game rules
        console.log("WAR");
        //sound effects?
      }
      //check each array. If length is 0, they lose.
      if (numCards1 === 0){
        //COMPUTER/NAME(p2) WINS
        //have a p in HTML with winning message. hide the losing person's card image so its a blank space
        //confetti effect if time or something fun
        //sound effects?

      }
      if (numCards2 === 0){
        //if player2 name is Computer, YOU WIN
        //if playing a friend, NAME(p1) WINS
      }
      card1++;
      card2++;
    }
    flipCardsBtn.addEventListener('click', flipCards);
  })
}

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
      array.splice(index, 1);
  }
}

function addElement(array, elem, item) {
  var index = array.indexOf(elem);
  if (index > -1) {
      array.splice(index, 0, item);
  }
}