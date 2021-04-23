// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

  d3.json(queryUrl).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    console.log(data.features[0].geometry.coordinates); // location [o]up-down, [1]L-R, and [2]depth
    console.log(data.features[0].properties.mag); // magnitude

    var dataFeatures = data.features;

    console.log(dataFeatures);

    // L.geoJson(data).addTo(myMap);
    for (var i = 0; i < dataFeatures.length; i++) {

    //     // Conditionals for countries points
    //     var color = "";
    //     if (countries[i].points > 200) {
    //       color = "yellow";
    //     }
    //     else if (countries[i].points > 100) {
    //       color = "blue";
    //     }
    //     else if (countries[i].points > 90) {
    //       color = "green";
    //     }
    //     else {
    //       color = "red";
    //     }
      
        // Add circles to map
        L.circle([dataFeatures[i].geometry.coordinates[1], dataFeatures[i].geometry.coordinates[0]], {
          fillOpacity: 0.99,
          color: "white",
          fillColor: "green",
          // Adjust radius
          radius: dataFeatures[i].properties.mag * 30000
        }).bindPopup("<h1> Eathquake </h1>").addTo(myMap);
      }

  });