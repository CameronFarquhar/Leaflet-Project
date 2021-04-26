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


var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-04-21&endtime=" +
  "2021-04-22&maxlongitude=-17.52148437&minlongitude=-208.83789062&maxlatitude=80.74894534&minlatitude=-60.16517337";

  d3.json(queryUrl).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    console.log(data.features[0].geometry.coordinates); // location [o]up-down, [1]L-R, and [2]depth
    console.log(data.features[0].properties.mag); // magnitude
    var dataFeatures = data.features;

    console.log(dataFeatures);

    for (var i = 0; i < dataFeatures.length; i++) {
        console.log(data.features[i].geometry.coordinates[2])
    //     // Conditionals for depth color
        var color = "";
        if (data.features[i].geometry.coordinates[2] > 90) {
          // color = "red"; 
          color = "rgb(255,0,0)";
        }
        else if (data.features[i].geometry.coordinates[2] > 70) {
          // color = "orange"; 
          color = "rgb(225,100,0)";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
          // color = "rgb(255,218,185)"; 
          color = "rgb(200,200,0)";
        }
            else if (data.features[i].geometry.coordinates[2] > 30) {
          // color = "lightblue";
          color = "rgb(255,255,0)";
        }
            else if (data.features[i].geometry.coordinates[2] > 10) {
          // color = "yellow";
          color = "rgb(150,255,0)";
        }
        else {
          // color = "green";
          color = "rgb(0,255,0)";
        }
      
        // Add circles to map
        L.circle([dataFeatures[i].geometry.coordinates[1], dataFeatures[i].geometry.coordinates[0]], {
          fillOpacity: 0.7,
          colorOpacity: 0.7,
          color: color,
          fillColor: color,
          // Adjust radius
          radius: dataFeatures[i].properties.mag * 30000
        }).bindPopup("<h2> Location: " + dataFeatures[i].properties.place + "</h2> <hr> <h3> Magnitude: " + data.features[i].geometry.coordinates[2] + "</h3>").addTo(myMap);
      }

  });