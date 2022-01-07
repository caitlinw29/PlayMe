// All of this code is commented out by Mike so that he can utilize it on his own computer without messing up anything that other people are working on.

// This is what a response from the bored API looks like.  variables for storage will be based on this FormData.
// {
// 	"activity": "Learn a new programming language",
// 	"accessibility": 0.25,
// 	"type": "education",
// 	"participants": 1,
// 	"price": 0.1,
// 	"key": "5881028"
// }
// {
// "activity": "Basic Knife Skills",
// 	"accessibility": 0.25,
// 	"type": "education",
// 	"participants": 1,
// 	"price": 0.1,
// 	"key": "1234567"
// }

// // {"activity": "Learn How to Build a Snowman",
// // "accessibility": 0.25,
// // "type": "education",
// // "participants": 1,
// // "price": 0.1,
// // "key": "7654321"
// // }

// // this is code that was
// function storeData() {

// save to favorites button returns save to favorites
// this variable contains the HTML information
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



 
// document.getElementById("fvBtn").addEventListener
// ("click", function myfunction() {
//     var sub = $('#input').val();
//     console.log(sub);
//   }

// var key = id=key <p> Price: <span id="price"></span></p>
// var actName = id=

// {
//       document.getElementById("card-title").innerHTML = "Hello World";
//     console.log("favBtn");
//     });

//
//    element.addEventListener('mousedown', (event) => {
//          event.preventDefault();

//    var entryId = element.id

//    var entry = element.previousElementSibling.value;
//    console.log('entry', entry);

//    var addEntry  = {
//      "id": entryId,
//      "entry": entry,
//      }

//      var existingSchedule = JSON.parse(localStorage.getItem("allSchedules")) || [];

//      localStorage.setItem("addEntry", JSON.stringify(addEntry))
//      existingSchedule.push(addEntry)
//      localStorage.setItem("allSchedules", JSON.stringify(existingSchedule))

//        })
//      })
//    }
//    storeData()

//    function retrieveData() {
//    var existingSchedules = JSON.parse(localStorage.getItem("allSchedules"));
//    existingSchedules.forEach((schedule)=> {
//      var eventItem = schedule.entry;
//      var saveBtn = schedule.id;
//      var saveId = document.getElementById(`${saveBtn}`)
//      var eventSpot = saveId.previousElementSibling;
//      eventSpot.value = eventItem

//    })

//    }

//    retrieveData();
