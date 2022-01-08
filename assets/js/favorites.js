//collection is the div to hold the activities
var collectionElement = document.getElementById("collection");

var existingActivities = JSON.parse(localStorage.getItem("allActivities")) || [];
//if we have activities, create a div for each of them and input the activity info
if (existingActivities.length > 0 ) {
    makeActivityDivs();
}

function makeActivityDivs(){
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

//for each sort, on click, check the type of sort and then sort ascending or descending
$(".material-icons").on("click", function() {
    //clear the old list first
    removeAllChildNodes(collectionElement);
    if (this.parentNode.textContent.includes("Price")){
        if (this.textContent === "arrow_upward"){
            existingActivities.sort(function(a, b) {
                var textA = a.price.toUpperCase();
                var textB = b.price.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
            makeActivityDivs();
        } else if (this.textContent === "arrow_downward"){
            existingActivities.sort(function(a, b) {
                var textA = a.price.toUpperCase();
                var textB = b.price.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            makeActivityDivs();
        }
    } else if (this.parentNode.textContent.includes("Participants")){
        if (this.textContent === "arrow_upward"){
            existingActivities.sort(function(a, b) {
                var textA = a.participants.toUpperCase();
                var textB = b.participants.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
            makeActivityDivs();
        } else if (this.textContent === "arrow_downward"){
            existingActivities.sort(function(a, b) {
                var textA = a.participants.toUpperCase();
                var textB = b.participants.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            makeActivityDivs();
        }
    } else if (this.parentNode.textContent.includes("Type")){
        if (this.textContent === "arrow_upward"){
            existingActivities.sort(function(a, b) {
                var textA = a.type.toUpperCase();
                var textB = b.type.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
            makeActivityDivs();
        } else if (this.textContent === "arrow_downward"){
            existingActivities.sort(function(a, b) {
                var textA = a.type.toUpperCase();
                var textB = b.type.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            makeActivityDivs();
        }
    } else if (this.parentNode.textContent.includes("Activity")){
        if (this.textContent === "arrow_upward"){
            existingActivities.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
            makeActivityDivs();
        } else if (this.textContent === "arrow_downward"){
            existingActivities.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            makeActivityDivs();
        }
    }
})

//remove the children (except the first, which for some reason is 2 not 1) to clear the old list
function removeAllChildNodes(parent) {
    while (parent.childNodes.length > 2) {
        parent.removeChild(parent.lastChild);
    }
}

//set up function to grab the value of the property
function GetPropertyValue(obj, dataToRetrieve) {
    return dataToRetrieve
      .split('.') // split string based on `.`
      .reduce(function(o, k) {
        return o && o[k]; // get `o` and return, also checks sub properties
      }, obj) // set initial value as object
}
