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
        activityNewElement.setAttribute("id", currentActivity.name);

        var activityCol = document.createElement("div");
        var typeCol = document.createElement("div");
        var participantsCol = document.createElement("div");
        var priceCol = document.createElement("div");
        //deletion will be an X to delete the saved activity
        var deletion = document.createElement("div");
        activityCol.className = "col s4";
        typeCol.className = "col s2";
        participantsCol.className = "col s2";
        priceCol.className = "col s2";
        deletion.className = "col s2 deletion";

        activityCol.textContent = currentActivity.name;
        typeCol.textContent = currentActivity.type;
        participantsCol.textContent = currentActivity.participants;
        priceCol.textContent = currentActivity.price;
        //classes for deletion are in style.css
        deletion.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>";

        activityNewElement.append(activityCol, typeCol, participantsCol, priceCol, deletion);
        collectionElement.append(activityNewElement);
    }
}

//for each deletion, on click, delete the div and delete the activity from localStorage
$(".deletion").on("click", function() {
    //remove the div if deletion is clicked
    const activityRow = this.parentNode;
    activityRow.parentNode.removeChild(this.parentNode);
    //find the current activity to remove it from localStorage
    for (let item in existingActivities) {
        let propVal = GetPropertyValue(existingActivities[item], "name");
        //if index exists, splice that index out of the array
        if (propVal === this.parentNode.id){
            existingActivities.splice(item, 1);
        }
    }
    //save new array
    localStorage.setItem("allActivities", JSON.stringify(existingActivities));
})

//set up function to grab the value of the property
function GetPropertyValue(obj, dataToRetrieve) {
    return dataToRetrieve
      .split('.') // split string based on `.`
      .reduce(function(o, k) {
        return o && o[k]; // get `o` and return, also checks sub properties
      }, obj) // set initial value as object
  }