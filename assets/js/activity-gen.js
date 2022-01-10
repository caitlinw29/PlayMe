const randomBtn = document.getElementById("findActivityBtn");
const activity = document.getElementById("activity");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");
const activityCardImg = document.getElementById("activityCardImg");
const loader = document.getElementById("loading");
const activityCard = document.getElementById("activityCard");
const filter = document.getElementById("filter");
const selectType = document.getElementById('selectType');
const selectPrice = document.getElementById('selectPrice');
const selectNumPeople = document.getElementById('selectNumPeople');
let activityString = "";

filter.addEventListener("click", function(){
  this.parentNode.className = "col s12";
  this.className = "collapsible-header cyan lighten-5 cyan-text text-lighten-5";
})
randomBtn.addEventListener("click", generateRandomActivityCard);

function generateRandomActivityCard(){
  let randomActivityURL = "http://www.boredapi.com/api/activity";
  //hide the old card and display loader while waiting
  activityCard.classList.add("hidden");
  displayLoader();
  //conditionals to check search params
  const filterOptions = [];
  if(selectPrice.selectedIndex !== 0) {
    //grabs the user choice
    var selectedPrice = selectPrice.options[selectPrice.selectedIndex].text;
    let priceUrl;
    //adds the appropriate range to the url
    if (selectedPrice === "FREE"){
      priceUrl = "?price=0.0";
      randomActivityURL = randomActivityURL.concat(priceUrl);
    } else if (selectedPrice === "$"){
      priceUrl = "?minprice=.1&maxprice=.29";
      randomActivityURL = randomActivityURL.concat(priceUrl);
    } else if (selectedPrice === "$$"){
      priceUrl = "?minprice=.3&maxprice=.59";
      randomActivityURL = randomActivityURL.concat(priceUrl);
    } else if (selectedPrice === "$$$"){
      priceUrl = "?minprice=.6&maxprice=.89";
      randomActivityURL = randomActivityURL.concat(priceUrl);
    } else if (selectedPrice === "$$$$"){
      priceUrl = "?minprice=.9&maxprice=1.0";
      randomActivityURL = randomActivityURL.concat(priceUrl);
    }
    //array is used to check if nothing was selected
    filterOptions.push(selectedPrice);
  }

  if(selectType.selectedIndex !== 0) {
    let typeUrl;
    var selectedType = selectType.options[selectType.selectedIndex].text;
    //if there is already a ? in the url, & is used to link the sections
    if (randomActivityURL.includes("?")){
      typeUrl = "&type=" + selectedType;
    } else {
      typeUrl = "?type=" + selectedType;
    }
    randomActivityURL = randomActivityURL.concat(typeUrl);
    filterOptions.push(selectedType);
  } 

  if(selectNumPeople.selectedIndex !== 0) {
    let peopleUrl;
    var selectedPeople = selectNumPeople.options[selectNumPeople.selectedIndex].text;
    if (randomActivityURL.includes("?")){
      peopleUrl = "&participants=" + selectedPeople;
    } else {
      peopleUrl = "?participants=" + selectedPeople;
    }
    randomActivityURL = randomActivityURL.concat(peopleUrl);
    filterOptions.push(selectedPeople);
  } 
 
  //if nothing was chosen, add / to run the random activity as normal
  if (filterOptions.length === 0){
    randomActivityURL += "/"
  } 

  fetch(randomActivityURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //if there is an error, no search results found. So let the user know. 
        if (data.error){
          document.getElementById("modal2").classList.remove("hidden");
          hideLoader();
          return;
        }
        //!! If adding image search, delete the following two lines
        hideLoader();
        activityCard.classList.remove("hidden");
        //set the activityString up to plug into the imageURL
        activityString = data.activity.toLowerCase();
        var activityArray = activityString.split(" ");
        activityString = activityArray.join("%20");

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

        //if a link exists, plug it in to the href and use the activity as text content
        if (data.link !== ""){
          link.href = data.link;
          link.textContent = data.activity;
        }
        //fetch an image using the activity name as a search query
        //!! To add image search back in, uncomment below and add your key
        // var imageURL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + activityString + "&pageNumber=1&pageSize=1&autoCorrect=true";
        // fetch(imageURL, {
        //   "method": "GET",
        //   "headers": {
        //     "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        //     "x-rapidapi-key": //!! Add your RAPIDAPI key here
        //   }
        // })
        //   .then(response => {
        //     return response.json();
        //   })
        //   .then(data => {
        //     //set the picture in the card, hide the loader, and show the card
        //     activityCardImg.src = data.value[0].thumbnail;
        //     hideLoader();
        //     activityCard.classList.remove("hidden");
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
  //set up the addActivity object with the textContent of the pertaining areas
  var activityText = activity.textContent;
  var activityType = type.textContent;
  var activityParticipant = participants.textContent;
  var activityPrice = price.textContent;
  var addActivity = {
    name: activityText,
    type: activityType,
    participants: activityParticipant,
    price: activityPrice
  };
  
  var existingActivities = JSON.parse(localStorage.getItem("allActivities")) || [];
  let storedActivities = [];
  //check for existing activities so duplicates are not saved
  for (let item in existingActivities) {
    let propVal = GetPropertyValue(existingActivities[item], "name");
    storedActivities.push(propVal);
  }
  //if the activity is already stored, tell the user and return
  if (storedActivities.includes(addActivity.name)) {
    document.getElementById("modalHeading").textContent = 'Already saved';
    document.getElementById("modalText").textContent = 'You already saved this!';
    return;
  } else { //otherwise push the new activity to the array that goes into localstorage
    //and tell the user they saved
    existingActivities.push(addActivity);
    document.getElementById("modalHeading").textContent = 'Saved';
    document.getElementById("modalText").textContent = 'Your activity was saved!';
  }
  //save to storage
  localStorage.setItem("allActivities", JSON.stringify(existingActivities));
});

//set up function to grab the value of the property
function GetPropertyValue(obj, dataToRetrieve) {
  return dataToRetrieve
    .split('.') // split string based on `.`
    .reduce(function(o, k) {
      return o && o[k]; // get `o` and return, also checks sub properties
    }, obj) // set initial value as object
}

//set up modal
$(document).ready(function(){
  $('.modal').modal({
    //adjust opacity so that there isn't a gray screen when finding an activity
    opacity: 0,
  });
});

//set up select
$(document).ready(function(){
  $('select').formSelect();
});

//collapsible
$(document).ready(function(){
  $('.collapsible').collapsible();
});