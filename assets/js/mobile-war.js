//specifically looks to see if the page is smaller than 500px on page load
//if it is, goes to mobile-war.html instead (completely different layout)
function getTemplate() {
    if (screen.width < 500) {
      return window.location.replace("mobile-war.html");
    }
}
getTemplate();
