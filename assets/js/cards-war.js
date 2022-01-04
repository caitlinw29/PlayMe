const computerBtn = document.getElementById("computerBtn");
const friendBtn = document.getElementById("friendBtn");
const onePlayer = document.getElementById("onePlayer");
const twoPlayer = document.getElementById("twoPlayer");
const player1name = document.getElementById("player1name");
const player2name = document.getElementById("player2name");
const startWarBtn = document.getElementById("startWarBtn");

computerBtn.addEventListener("click", chooseComputer);
friendBtn.addEventListener("click", chooseFriend);

function chooseComputer(){
  //show the input for player 1
  onePlayer.classList.remove("hidden");
   //if there is input already there before keydown (edge case if user is flipping back and forward between options)
   if (player1name.value){
    //show the start button
    startWarBtn.classList.remove("hidden");
  }
  //listen for keydown in the player1name input
  player1name.addEventListener("keydown", function(){
    //if only checking one field 
    if(twoPlayer.classList.contains("hidden")){
      //show start button on keydown
      startWarBtn.classList.remove("hidden");
    } else { //if checking both fields (edge case where user is flipping back and forward)
      //check for the second name to be filled in before showing start button
      if (player2name.value){
        startWarBtn.classList.remove("hidden");
      }
    }
  })
  //edge case for if user clicks on friend button after computer has been chosen
  friendBtn.addEventListener("click", function(){
    //if there is no name for player 2, change the start button back to hidden
    if (!player2name.value){
      startWarBtn.classList.add("hidden");
    }
  })
}

function chooseFriend(){
  //show both input fields
  onePlayer.classList.remove("hidden");
  twoPlayer.classList.remove("hidden");
  //check for keydown in first input
  player1name.addEventListener("keydown", function(){
    //if player 2 has text already, show the start button
    if (player2name.value){
      startWarBtn.classList.remove("hidden");
    }
  })
  //check for keydown in second input
  player2name.addEventListener("keydown", function(){
    //if player 1 has text already, show the start button
    if (player1name.value){
      startWarBtn.classList.remove("hidden");
    }
  })
  //edge case for if user is clicking between the options
  computerBtn.addEventListener("click", function(){
    //if going from two player to one player, remove the input for player 2
    twoPlayer.classList.add("hidden");
  })
}