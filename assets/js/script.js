
// this is what a response from the bored API looks like.  variables for storage will bebased on this
// {
// 	"activity": "Learn a new programming language",
// 	"accessibility": 0.25,
// 	"type": "education",
// 	"participants": 1,
// 	"price": 0.1,
// 	"key": "5881028"
// }


// function storeData() {
  
//     document.querySelectorAll(".saveBtn").forEach((svBtn) => {
//        svBtn.addEventListener('click', (event) => {
//          event.preventDefault();
   
//    var entryId = svB.id
   
//    var entry = element.previousElementSibling.value;
//    console.log('entry', entry);
   
//    var addEntry  = { 
//      "id": entryId, 
//      "entry": entry,
//      }
   
//      var apiActivity = JSON.parse(localStorage.getItem("API card")) || [];
   
//      localStorage.setItem("addEntry", JSON.stringify(addEntry)) 
//      apiActivity.push(addEntry)
//      localStorage.setItem("API card", JSON.stringify(apiActivity))
   
//        })
//      })
//    }
//    storeData