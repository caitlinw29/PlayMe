
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
document.getElementById("fvBtn").addEventListener
    ("click", function(){
        console.log("Save to Favorites")
    });



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