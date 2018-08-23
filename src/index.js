ScrollMagic = require("scrollmagic");

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.753746, lng: -84.38633 },
    zoom: 16
  });
}

let controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: "onEnter",
    duration: "200%"
  }
});
