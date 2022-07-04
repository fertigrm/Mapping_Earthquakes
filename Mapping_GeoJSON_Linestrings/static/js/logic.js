// Add console.log to check to see if our code is working.
console.log("working");



// Pass our map layers into our layers control and add the layers control to the map.
//L.control.layers(baseMaps).addTo(map);

//coords in reverse order in setView because GeoJSON is x, y
// L.geoJSON() layer reverses the coords to plot on map
// Add GeoJSON data.



// Grabbing our GeoJSON data.


  


// or 
// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//    center: [
//      40.7, -94.5
//    ],
//    zoom: 4
//  });

// refrence Leaflet quick start guide 
// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'streets'tile layer to the map
//streets.addTo(map);

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
  };

// Create the map object with center and zoom level.
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark]
});

// pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);
// Accessing the airport GeoJSON URL
let torontoData = 'https://raw.githubusercontent.com/fertigrm/Mapping_Earthquakes/main/torontoRoutes.json';

// creating a style for the lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
}
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup('<h3> Airline: ' + feature.properties.airline + '</h3> <hr><h3> Destination:'
        + feature.properties.dst + '</h3>');
    }
  }).addTo(map);
});
