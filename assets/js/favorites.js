// save to favorites button returns save to favorites
// this variable contains the HTML information
var collectionElement = document.getElementById("collection");


var existingActivities =
    JSON.parse(localStorage.getItem("allActivities")) || [];

if(existingActivities.length > 0 ) {
    for (var i = 0; i < existingActivities.length; i++){
        var activityNewElement = document.createElement("div");
        var activities = existingActivities[i];   
        activityNewElement.setAttribute("id", "activity-" + i);
        activityNewElement.textContent = activities.name;
        activityNewElement.setAttribute("style", "margin-bottom:1%; padding:1%");
        activityNewElement.classList.add("teal")
        collectionElement.append(activityNewElement);
    }
  
}



