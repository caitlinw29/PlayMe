

// save to favorites button returns save to favorites
// this variable contains the HTML information
var keyElement = document.getElementById("key");
var activityElement = document.getElementById("activity");
var collectionElement = document.getElementById("collection");


var existingActivities =
    JSON.parse(localStorage.getItem("allActivities")) || [];

if(collectionElement && existingActivities.count > 0 ) {
    collectionElement.innerHTML = "";
    for (var i = 0; i < existingActivities.count; i++){
        var activityNewElement = document.createElement("div");
        var activities = existingActivities[i];   
        activityNewElement.setAttribute("id", activities.key );
        activityNewElement.innerText = activities.name;
        collectionElement.append(activityNewElement);
    }
  
}

document.getElementById("addFaves").addEventListener("click", function () {
  // console.log("Save to Favorites");
  // the variables below contain only the information in the text field.
  var activityText = activityElement.textContent;
  console.log(activityKey);
  console.log(activityText);

  var addActivity = {
    id: activityKey,
    name: activityText,
  };

  var existingActivities =
    JSON.parse(localStorage.getItem("allActivities")) || [];

  existingActivities.push(addActivity);
  localStorage.setItem("allActivities", JSON.stringify(existingActivities));
});

 
