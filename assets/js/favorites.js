// save to favorites button returns save to favorites
// this variable contains the HTML information
var collectionElement = document.getElementById("collection");


var existingActivities =
    JSON.parse(localStorage.getItem("allActivities")) || [];

if(existingActivities.length > 0 ) {
    for (var i = 0; i < existingActivities.length; i++){
        var currentActivity = existingActivities[i];   
        var activityNewElement = document.createElement("div");
        activityNewElement.className = "teal row";
        activityNewElement.setAttribute("style", "margin-bottom:1%; padding:1%");
        activityNewElement.setAttribute("id", "activity-" + i);

        var activityCol = document.createElement("div");
        var typeCol = document.createElement("div");
        var participantsCol = document.createElement("div");
        var priceCol = document.createElement("div");
        var deleteCol = document.createElement("div");
        activityCol.className = "col s4";
        typeCol.className = "col s2";
        participantsCol.className = "col s2";
        priceCol.className = "col s2";
        deleteCol.className = "col s2";

        
        activityCol.textContent = currentActivity.name;
        typeCol.textContent = currentActivity.type;
        participantsCol.textContent = currentActivity.participants;
        priceCol.textContent = currentActivity.price;
        deleteCol.textContent = "X";
        activityNewElement.append(activityCol, typeCol, participantsCol, priceCol, deleteCol);
        collectionElement.append(activityNewElement);
    }
  
}



