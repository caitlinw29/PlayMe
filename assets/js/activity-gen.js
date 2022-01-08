const randomBtn = document.getElementById("findActivityBtn");
const activity = document.getElementById("activity");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");
const activityCardImg = document.getElementById("activityCardImg");
let activityString = "";

randomBtn.addEventListener("click", generateRandomActivityCard);

function generateRandomActivityCard(){
  
  var randomActivityURL = "http://www.boredapi.com/api/activity/"
  fetch(randomActivityURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { 
        console.log(data);
        activityString = data.activity;
        activity.textContent = activityString;
        type.textContent = data.type;
        participants.textContent = data.participants;
        let symbolPrice;
        if(data.price > 0 && data.price < .1){
          symbolPrice = "FREE";
        } else if (data.price >= .1 && data.price < .3){
          symbolPrice = "$";
        } else if (data.price >= .3 && data.price < .6){
          symbolPrice = "$$";
        } else if (data.price >= .6 && data.price < .9){
          symbolPrice = "$$$";
        } else if (data.price >= .9){
          symbolPrice = "$$$$";
        }
        price.textContent = symbolPrice;
        if (data.link !== ""){
          link.textContent = data.link;
        }
      })
  fetch("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=taylor%20swift&pageNumber=1&pageSize=1&autoCorrect=true", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      "x-rapidapi-key": "028b2f00a2msh04217c3fa191984p185e73jsn48767f836887"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      activityCardImg.src = data.value[0].thumbnail;
    })
    .catch(err => {
      console.error(err);
    });
}
