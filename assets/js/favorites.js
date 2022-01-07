// All of this code is commented out by Mike so that he can utilize it on his own computer without messing up anything that other people are working on.

// This is what a response from the bored API looks like.  variables for storage will be based on this FormData.

// {
// "activity": "Basic Knife Skills",
// 	"accessibility": 0.25,
// 	"type": "education",
// 	"participants": 1,
// 	"price": 0.1,
// 	"key": "1234567"
// }


// // this is code that was
// function storeData() {


// this variable contains the HTML information that is necessary to put data necessary to fetch the API key at a later date into local storage and to put the name of the activity into the Favorite activities list

var keyElement = document.getElementById("key");
var activityElement = document.getElementById("activity");
var collectionElement = document.getElementById("collection");


var existingActivities =
    JSON.parse(localStorage.getItem("allActivities")) || [];

if(existingActivities.count > 0 ) {
    collectionElement.innerHTML = "";
    for (var i = 0; i < existingActivities.count; i++){
        var activityNewElement = document.createElement("div");
        var activity = existingActivities[i];   
        activityNewElement.setAttribute("id", activity.key );
        activityNewElement.innerText = activity.name;
        collectionElement.append(activityNewElement);
    }
  
}

