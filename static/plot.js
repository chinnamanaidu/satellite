// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
var url = "https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=J3H9EJ-Z2GE6Y-BC2E6G-4LOF";


var newYorkCoords = [-115.814, 32.7488333];
var mapZoomLevel = 8;

// Create the createMap function

// Creating map object

// Adding tile layer

// Load in GeoJson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

var myMap = L.map("map", {
    center: [32.7488333,-115.814],
    zoom: mapZoomLevel
   });

var geojson;
//d3.json(geoData, creaetMarkers);
var satelite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

//.addTo(myMap);
// Streetmap Layer


var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v11",
  accessToken: API_KEY
});

var erthQuakeMarkers = [];
var tectonicLines = [];

var inputElement = d3.select("#selDatasetCnt");

function optionCntChanged(inputValue) {

  console.log("inputElement");
  console.log(inputElement);

  

  d3.json("samples.json", function (response) {
    //console.log(response);
    //console.log(response.features[0]);
    //console.log(response.features.length);
   
    
    var opac=0.9;
    var cl="lightred";
    for (var i=0; i<response.positions.length; i++) {
      var location = response.positions[i];
   console.log(location);
   console.log(location.satlatitude);
   console.log(location.satlongitude);
   //console.log(location.properties.mag);
   //console.log(location.properties.place);
   
     L.circle([location.satlatitude, location.satlongitude], {
       fillOpacity: opac,
       color: "black",
       fillColor: cl,
       // Setting our circle's radius equal to the output of our markerSize function
       // This will make our marker's size proportionate to its population
       radius: 4*10000
     }).bindPopup("<h1> Sat Country:" + inputValuee + "</h1> <hr> <h3>Sat Name: " + inputValue+ "</h3>").addTo(myMap);
    }

  });

}

   
optionCntChanged("US");
 

// Use the map method with the arrow function to return all the filtered movie titles.
//var titles = filteredMovies.map(movies =>  movies.title);

// Use the map method with the arrow function to return all the filtered movie metascores.
//var ratings = filteredMovies.map(movies => movies.metascore);






