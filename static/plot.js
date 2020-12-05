// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
var url = "https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=J3H9EJ-Z2GE6Y-BC2E6G-4LOF";


var newYorkCoords = [-115.814, 32.7488333];
var mapZoomLevel = 8;

// Create the createMap function

// Creating map object

// Adding tile layer

// Load in GeoJson data
//var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

//var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


var myMap = L.map("map", {
    center: [32.7488333,-115.814],
    zoom: mapZoomLevel
   });
   

//d3.json(geoData, creaetMarkers);

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});


//.addTo(myMap);
// Streetmap Layer




//var inputElement = d3.select("#selDatasetCnt");
//var inputValueCnt = inputElement.property("value");
var inputValueCnt ="US";
function optionCntChanged(inputValue) {
  console.log("data_cnt");
  console.log(testVal);
  console.log("resdata");
  console.log(resdata);

  if (resdata != '') {
  var geocode1 = JSON.parse(resdata);
  console.log(geocode1['respdata']);
  console.log(geocode1['respdata'].length);
  console.log(geocode1['respdata'][1]);
  console.log(geocode1['respdata'][1]['latitude']);
  console.log(geocode1['respdata'][1]['longitude']);
  console.log("country");
  console.log(testVal);
  console.log("category");
  console.log(testVal);
  console.log("inputElement");

  //var inputValueCnt = inputElement.property("value");
  //console.log(inputValueCnt);
  console.log("inputValue");
  console.log(inputValue);
  cl="green"
  opac=0.9
  var stateMarkers = [];
  var geocode = JSON.parse(resdata);
  for (var i=1; i<geocode['respdata'].length; i++) {
    console.log("This is within the for condition");
    console.log(geocode['respdata'][i]);
   
    stateMarkers.push(
      L.circle([geocode['respdata'][i]['latitude'],geocode['respdata'][i]['longitude']], {
        fillOpacity: opac,
        color: cl,
        fillColor: "black",
        radius: 4*1000
      }).bindPopup("<h3> latitude:" + geocode['respdata'][i]['latitude'] + "</h3> <br> <h3>longitude: " + geocode['respdata'][i]['longitude'] + "</h3><br>"));
                   
                   /*
                   .bindPopup("<h3> latitude:" + geocode['respdata'][i]['latitude'] + "</h3> <br> "+
                    "<h3>longitude: " + geocode['respdata'][i]['longitude'] + "</h3><br>"))
                     "<h3>satname: " + geocode['respdata'][i]['satname'] + "</h3><br> "+
                    "<h3>satid: " + geocode['respdata'][i]['satid'] + "</h3><br> "+
                    "<h3>azimuth: " + geocode['respdata'][i]['azimuth'] + "</h3><br> "+
                    "<h3>elevation: " + geocode['respdata'][i]['elevation'] + "</h3><br> "+
                    "<h3>altitude: " + geocode['respdata'][i]['altitude'] + "</h3><br>"));

                    altitude: 36083.24
azimuth: 54.9
elevation: -51.42
latitude: -10.46726356
longitude: 68.71750747
satid: 23948
satname: "ARABSAT 2A"
                    */
    
    /*
  L.circle([geocode['respdata'][i]['latitude'],geocode['respdata'][i]['longitude']], {
    fillOpacity: opac,
    color: "black",
    fillColor: cl,
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: 4*10000
  }).bindPopup("<h1> Sat Country:" + inputValue + "</h1> <hr> <h3>Sat Name: " + inputValue+ "</h3>").addTo(myMap);
  */
}

console.log(stateMarkers);

var states = L.layerGroup(stateMarkers);
// Create an overlay object
var overlayMaps = {
  "State Population": states
};
var baseMaps = {
  "Street Map": streetmap
};
// Define a map object
//streetmap.addTo(myMap);
//states.addTo(myMap);
/*
var myMap = L.map("map", {
  center: [-115.814, 32.7488333],
  zoom: 12,
  layers: [ streetmap, states]
});
*/

L.control.layers( baseMaps, overlayMaps, {
  collapsed: true
}).addTo(myMap);


  //d3.select(" .my-link>a").attr("href", "https://nytimes.com").text("Now this is the link for NYT");

  //window.for("/getSatellite/"+inputValue);

}

}

console.log("data_cnt");
console.log(testVal);
//console.log("data_cat");
//console.log(resdata);


optionCntChanged(inputValueCnt);
 

// Use the map method with the arrow function to return all the filtered movie titles.
//var titles = filteredMovies.map(movies =>  movies.title);

// Use the map method with the arrow function to return all the filtered movie metascores.
//var ratings = filteredMovies.map(movies => movies.metascore);



/*
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
*/


