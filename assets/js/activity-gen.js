const randomBtn = document.getElementById("findActivityBtn");
const activity = document.getElementById("activity");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");
const activityCardImg = document.getElementById("activityCardImg");
const loader = document.getElementById("loading");
const activityCard = document.getElementById("activityCard");
let activityString = "";
let activityKey;

randomBtn.addEventListener("click", generateRandomActivityCard);

function generateRandomActivityCard(){
  activityCard.classList.add("hidden");
  displayLoader();
  var randomActivityURL = "http://www.boredapi.com/api/activity/"
  fetch(randomActivityURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { 
        hideLoader();
        activityCard.classList.remove("hidden");
        //set the activityString up to plug into the imageURL
        activityString = data.activity.toLowerCase();
        var activityArray = activityString.split(" ");
        activityString = activityArray.join("%20");

        //save the key for later
        activityKey = data.key;
        //change the textContent of the card
        activity.textContent = data.activity;
        type.textContent = data.type;
        participants.textContent = data.participants;
        let symbolPrice;
        //set up price ranges
        if(data.price >= 0 && data.price < .1){
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
        //if a link exists, plug it in to the
        if (data.link !== ""){
          link.href = data.link;
          link.textContent = data.activity;
        }
        //!! DO NOT ADD THIS IN YET. IT ADDS THE PICTURES BUT CAITLIN HAS TO PAY PAST A CERTAIN NUMBER OF API CALLS, SO WE ARE LEAVING IT OUT UNTIL PRESENTATION
        //!! THERE IS A HARDCODED IMAGE IN THE HTML, USE THAT FOR PRACTICE/MESSING WITH THE BUTTON 
        // var imageURL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + activityString + "&pageNumber=1&pageSize=1&autoCorrect=true";
        // fetch(imageURL, {
        //   "method": "GET",
        //   "headers": {
        //     "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        //     "x-rapidapi-key": "028b2f00a2msh04217c3fa191984p185e73jsn48767f836887"
        //   }
        // })
        //   .then(response => {
        //     return response.json();
        //   })
        //   .then(data => {
        //     activityCardImg.src = data.value[0].thumbnail;
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   });
      })
}

//loader functions to show spinning wheel
function displayLoader(){
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 30000);
}

function hideLoader(){
  loader.classList.remove("display");
}

//Add favorites to storage
document.getElementById("addFaves").addEventListener("click", function () {
  // console.log("Save to Favorites");
  // the variables below contain only the information in the text field.
  var activityText = activity.textContent;
  console.log(activityText);

  var addActivity = {
    name: activityText,
  };

  var existingActivities =
    JSON.parse(localStorage.getItem("allActivities")) || [];

  existingActivities.push(addActivity);
  localStorage.setItem("allActivities", JSON.stringify(existingActivities));
});
