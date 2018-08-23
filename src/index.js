//ScrollMagic = require("scrollmagic");
var center = { lat: 36.159410, lng: -86.788310 }
var points = [
  {
    lat: 36.152470,
    lng: -86.782050,
    title: 'Pine Street Flats',
    listingImages: './src/images/listingCellNoOverlay.png',
    listingStats: './src/images/listingCellWithOverlay.png'
  }, {
    lat: 36.158570,
    lng: -86.789610,
    title: 'Gossett on Church',
    listingImages: './src/images/listingCellNoOverlay.png',
    listingStats: './src/images/listingCellWithOverlay.png'
  }, {
    lat: 36.164600,
    lng: -86.788710,
    title: 'Residences at Capitol View',
    listingImages: './src/images/listingCellNoOverlay.png',
    listingStats: './src/images/listingCellWithOverlay.png'
  }, {
    lat: 36.168280,
    lng: -86.783030,
    title: 'The 500 Fifth',
    listingImages: './src/images/listingCellNoOverlay.png',
    listingStats: './src/images/listingCellWithOverlay.png'
  }
]
var markers = {}

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 36.159410, lng: -86.788310 },
    zoom: 14,
    disableDefaultUI: true
  });
}

function addPointToMap(point) {
  var myLatlng = new google.maps.LatLng(point.lat, point.lng);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: false,
    title: "Property One"
  });
  return marker
}

var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

let controller = new ScrollMagic.Controller();

//loads in pins
for (i = 0; i < points.length; i += 1) {
  var func = function (i) {
    marker = null
    var scene = new ScrollMagic.Scene({
      triggerElement: ".map",
      duration: 2 * size.height * .80,
      offset: 200 + (30 * (i + 1))
    })
      .addTo(controller)
      .addIndicators()
      .on("enter", function (e) {
        markers[i] = addPointToMap(points[i])
      })
      .on("leave", function (e) {
        markers[i].setMap(null)
      })
  }(i)
}

//set up scene for listing
i = 0
var scene = new ScrollMagic.Scene({
  triggerElement: ".listingCellNoOverlay:nth-child(1)",
  duration: size.height,
  offset: size.height / 2
})
  .setPin(".listingCellNoOverlay")
  .addIndicators({ name: "1 (duration:" + size.height / 2 + ")" })
  .addTo(controller)
  .on("start", function (e) {
    document.getElementsByClassName("listingCellNoOverlay")[i].style.backgroundImage = 'url(./src/images/listingCellNoOverlay.png)'
  })
  .on("end", function (e) {
    document.getElementsByClassName("listingCellNoOverlay")[i].style.backgroundImage = 'url(./src/images/listingCellWithOverlay.png)'
  })

var link = "https://maps.googleapis.com/maps/api/staticmap?center="
  + center.lat + "," + center.lng
  + '&size=' + (size.width) + 'x' + (size.height)
  + "&style=feature:all|element:labels|visibility:off"
  + "&zoom=14&maptype=hybrid&key=AIzaSyCuYKNiZzO0RUI6bWmgSeXf2zd6WczUVyQ"

console.log(document.getElementsByClassName("one"))

document.getElementsByClassName("one")[0].style.backgroundImage = "url(" + link + ")"
