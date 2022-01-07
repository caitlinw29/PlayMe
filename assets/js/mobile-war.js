function getTemplate() {
    if (screen.width < 500) {
      return window.location.replace("mobile-war.html");
    }
}
getTemplate();

