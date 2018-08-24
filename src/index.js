//ScrollMagic = require("scrollmagic");
var center = { lat: 36.159410, lng: -86.788310 }
var points = [
  {
    lat: 36.152470,
    lng: -86.782050,
    title: 'Pine Street Flats',
    listingImages: './src/images/PINESTREETFLATSIMAGENOOVERLAY.png',
    listingStats: './src/images/PINESTREETFLATSIMAGESWITHOVERLAY.png',
    preview: './src/images/PINESTREETFLATSMAPCARD.png',
  }, {
    lat: 36.158570,
    lng: -86.789610,
    title: 'Gossett on Church',
    listingImages: './src/images/listingCellNoOverlay1.png',
    listingStats: './src/images/listingCellWithOverlay1.png',
    preview: './src/images/GOSSETTONCHURCHMAPSUMMARY.png',
  }, {
    lat: 36.164600,
    lng: -86.788710,
    title: 'Residences at Capitol View',
    listingImages: './src/images/RESIDENCESATCAPITALVIEWNOOVERLAY.png',
    listingStats: './src/images/RESIDENCESATCAPITALVIEWWITHOVERLAY.png',
    preview: './src/images/RESIDENCESATCAPITOLVIEWMAPCARD.png',
  }, {
    lat: 36.168280,
    lng: -86.783030,
    title: 'The 500 Fifth',
    listingImages: './src/images/THE500FIFTHWITHNOOVERLAY.png',
    listingStats: './src/images/THE500FIFTHWITHOVERLAY.png',
    preview: './src/images/THE500FIFTHMAPCARD.png',
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

function addPointToMap(point, image) {
  var myLatlng = new google.maps.LatLng(point.lat, point.lng);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: false,
    title: "Property One",
    icon: image
  });
  return marker
}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

function createListingDomElements(j) {

  var mapSection = document.createElement("div");
  mapSection.classList.add("section2");

  var map = document.createElement("div");
  map.classList.add("map");
  mapSection.appendChild(map)

  var mapImg = document.createElement("img");
  mapImg.src = points[j].preview

  map.appendChild(mapImg)

  var listingSection = document.createElement("div");
  listingSection.classList.add("section");
  listingSection.classList.add("overlay");

  var listingCellNoOverlay = document.createElement("div");
  listingCellNoOverlay.classList.add("listingCellNoOverlay");
  listingCellNoOverlay.style.backgroundImage = 'url(' + points[j].listingImages + ')'
  //listingCellNoOverlay.style.backgroundAttachment = 'fixed'
  listingSection.appendChild(listingCellNoOverlay)

  var statsSection = document.createElement("div");
  statsSection.classList.add("section");
  statsSection.classList.add("overlay");

  var listingCellOverlay = document.createElement("div");
  listingCellOverlay.classList.add("listingCellOverlay");
  listingCellOverlay.style.backgroundImage = 'url(' + points[j].listingStats + ')'
  //listingCellOverlay.style.backgroundAttachment = 'fixed'
  statsSection.appendChild(listingCellOverlay)

  document.getElementById("splash").parentNode.insertBefore(statsSection, document.getElementById("splash").nextSibling);
  document.getElementById("splash").parentNode.insertBefore(listingSection, document.getElementById("splash").nextSibling);
  document.getElementById("splash").parentNode.insertBefore(mapSection, document.getElementById("splash").nextSibling);

}

let controller = new ScrollMagic.Controller();

for (j = points.length; j > 0; j -= 1) {
  createListingDomElements(j - 1)
}

//loads in pins
//set up scene for listing
function setupSections() {
  for (i = 0; i < points.length; i += 1) {
    for (j = 0; j < points.length; j += 1) {
      var func = function (j, i) {
        var map = document.getElementsByClassName('map')[i]
        console.log(map)
        var scene = new ScrollMagic.Scene({
          triggerElement: map,
          duration: 2 * size.height * .80,
          offset: 200 + (30 * (j + 1))
        })
          .addTo(controller)
          //.addIndicators()
          .on("enter", function (e) {
            console.log(i === j, i, j)
            markers[i + '' + j] = addPointToMap(points[j], i !== j ? './src/images/PinImage.png' : undefined)
          })
          .on("leave", function (e) {
            markers[i + '' + j].setMap(null)
          })
      }(j, i)
    }
    var func = function (i) {
      console.log(document.getElementsByClassName('listingCellNoOverlay'))
      var section = document.getElementsByClassName('listingCellNoOverlay')[i]
      var sectionStats = document.getElementsByClassName('listingCellOverlay')[i]
      var scene = new ScrollMagic.Scene({
        triggerElement: section,
        duration: size.height,
        offset: size.height / 2
      })
        .setPin(section)
        .addTo(controller)
        .on("start", function (e) {
          console.log('start', i, section)
          section.style.backgroundImage = 'url(' + points[i].listingImages + ')'
          sectionStats.style.backgroundImage = 'url(' + points[i].listingStats + ')'
        })
        .on("end", function (e) {
          console.log('end', i, section)
          section.style.backgroundImage = 'url(' + points[i].listingStats + ')'
          sectionStats.style.backgroundImage = 'none'
        })
      var sectionMap = document.getElementsByClassName('map')[i]
      var scene2 = new ScrollMagic.Scene({
        triggerElement: sectionMap,
        duration: size.height * 1 + 47,
        offset: size.height * .50 - 45
      })
        .setPin(sectionMap)
        .addTo(controller)
    }(i)
  }
}
var link = "https://maps.googleapis.com/maps/api/staticmap?center="
  + center.lat + "," + center.lng
  + '&size=' + (size.width) + 'x' + (size.height)
  + "&style=feature:all|element:labels|visibility:off"
  + "&zoom=14&maptype=hybrid&key=AIzaSyCuYKNiZzO0RUI6bWmgSeXf2zd6WczUVyQ"

console.log(document.getElementsByClassName("one"))

document.getElementsByClassName("one")[0].style.backgroundImage = "url(" + link + ")"
