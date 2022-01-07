const randomBtn = document.getElementById("findActivityBtn");

randomBtn.addEventListener("click", generateRandomActivityCard);

function generateRandomActivityCard(){
  var randomActivityURL = "http://www.boredapi.com/api/activity/"
  fetch(randomActivityURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { 
        console.log(data);
      })
}
