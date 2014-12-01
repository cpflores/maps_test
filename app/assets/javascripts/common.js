var ready = function() {
	
}


$(document).ready(ready);
$(document).on('page:load', ready);

function createImage(url){
  var image = {
    url: url,
    // This marker is 32 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  return image;
}

function createCustomMarker(coords,map,title){
  marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    icon: createImage("/assets/icon.png")
  });
}

function createInfoWindow(text){
  var infowindow = new google.maps.InfoWindow({
    content: text
  });
  return infowindow;
}

// add infowindow when clicking on the simple marker marker
var info = createInfoWindow("Congratulations!");
google.maps.event.addListener(marker, 'click', function() {
  info.open(map,marker);
});

// drawing static polyline
var lineCoordinates = [
  new google.maps.LatLng(30.055487, 31.279766),
  new google.maps.LatLng(30.223356, 31.324345),
  new google.maps.LatLng(30.345656, 31.567677),
  new google.maps.LatLng(30.565678, 31.676887)
];
createPolyline(map, lineCoordinates, lineSymbol);
 
var linePath;
function createPolyline(map,lineCoordinates,lineSymbol){
  linePath = new google.maps.Polyline({
    path: lineCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
   });
 linePath.setMap(map);
}

var lineSymbol = {
  path: 'M 0,-1 0,1',
  scale: 4,
  strokeOpacity: 1,
  strokeColor: '#393'
};
 
// modify the createPolyline function to contain the symbol
var linePath;
function createPolyline(map, lineCoordinates, lineSymbol){
  linePath = new google.maps.Polyline({
    path: lineCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
     icons: [{ // this Array is for adding symbols to the line
      icon: lineSymbol,
      offset: '100%'
    }]
  });
  linePath.setMap(map);
}

function animateCircle() {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 200;
 
    var icons = linePath.get('icons');
    icons[0].offset = (count / 2) + '%';
    linePath.set('icons', icons);
  }, 20);
}
 
//modify the `createPolyline` function to be like the following
var linePath;
function createPolyline(map, lineCoordinates, lineSymbol){
  linePath = new google.maps.Polyline({
    path: lineCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
     icons: [{ // this Array is for adding symbols to the line
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }]
  });
   linePath.setMap(map);
}

// drawing dynamic polyline
var polyOptions = {
  strokeColor: '#000000',
  strokeOpacity: 1.0,
  strokeWeight: 3
};
poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);
google.maps.event.addListener(map, 'click', addLatLng);
 
function addLatLng(event){
  var path = poly.getPath();
  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);
}

// drawing polygon
var polygonCoords = [
  new google.maps.LatLng(30.055487, 31.279766),
  new google.maps.LatLng(30.466465, 31.118292),
  new google.maps.LatLng(30.321384, 31.75737),
  new google.maps.LatLng(30.055487, 31.279766)
];
 
// Construct the polygon.
drawingPolygon(polygonCoords);
 
function drawingPolygon(polygonCoords) {
  var polygon = new google.maps.Polygon({
    paths: polygonCoords,
    strokeColor: '#FF00FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    draggable:true,
    editable: true
  });
  polygon.setMap(map);
}

// trying the drawing liberary
var drawingManager = new google.maps.drawing.DrawingManager({
  drawingMode: null,
  drawingControl: true,
  drawingControlOptions: {
    position: google.maps.ControlPosition.TOP_CENTER,
    drawingModes: [
      google.maps.drawing.OverlayType.MARKER,
      google.maps.drawing.OverlayType.CIRCLE,
      google.maps.drawing.OverlayType.POLYGON,
      google.maps.drawing.OverlayType.POLYLINE,
      google.maps.drawing.OverlayType.RECTANGLE
    ]
  },
  markerOptions: {
    icon: "/assets/icon.png"
  }
});
drawingManager.setMap(map);

var geocoding  = new google.maps.Geocoder();
$("#submit_button_geocoding").click(function(){
  codeAddress(geocoding);
});
$("#submit_button_reverse").click(function(){
  codeLatLng(geocoding);
});

function codeAddress(geocoding){
  var address = $("#search_box_geocoding").val();
  if(address.length > 0){
    geocoding.geocode({'address': address},function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  } else {
    alert("Search field can't be blank");
  }
}