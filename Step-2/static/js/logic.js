
// Adding tile layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var map = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: 'satellite-v9', // style URL
  accessToken: API_KEY
});


// All quakes within the past 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  d3.json(queryUrl).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    console.log(data.features[0].geometry.coordinates); // location [o]up-down, [1]L-R, and [2]depth
    console.log(data.features[0].properties.mag); // magnitude
    var dataFeatures = data.features;

    console.log(dataFeatures);

    var quakeCircles = [];
    console.log(quakeCircles);

    for (var i = 0; i < dataFeatures.length; i++) {
        console.log(data.features[i].geometry.coordinates[2])
        var color = "";
        if (data.features[i].geometry.coordinates[2] > 90) {
          color = "rgb(255,0,0)";
        }
        else if (data.features[i].geometry.coordinates[2] > 70) {
          color = "rgb(225,100,0)";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
          color = "rgb(200,200,0)";
        }
            else if (data.features[i].geometry.coordinates[2] > 30) {
          color = "rgb(255,255,0)";
        }
            else if (data.features[i].geometry.coordinates[2] > 10) {
          color = "rgb(150,255,0)";
        }
        else {
          // color = "green";
          color = "rgb(0,255,0)";
        }

      quakeCircles.push(
        L.circle([dataFeatures[i].geometry.coordinates[1], dataFeatures[i].geometry.coordinates[0]], {
        fillOpacity: 0.7,
        colorOpacity: 0.7,
        color: "black",
        weight: 0.5,
        fillColor: color,
        // Adjust radius
        radius: dataFeatures[i].properties.mag * 20000
      })
      .bindPopup("<h2> Location: " + dataFeatures[i].properties.place + "</h2> <hr> <h3> Depth: " + data.features[i].geometry.coordinates[2] + "</h3> <h3> Magnitude: " + dataFeatures[i].properties.mag + "</h3> <h3> Date: " + new Date(dataFeatures[i].properties.time) +  "</h3>")
      );
    
      }

  circleLayer = L.layerGroup(quakeCircles);

  var baseMaps = {
  Light: light,
  Dark: dark,
  Sattellite: map
  };
      
      
  var overlayMaps = {
  Hearthquakes: circleLayer
  };

  // Creating map object
  var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 3,
  layers: [light, circleLayer]
});

L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});


  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth</h4>";
  div.innerHTML += '<i style="background: rgb(0,255,0)"></i><span>-10 - 10</span><br>';
  div.innerHTML += '<i style="background: rgb(150,255,0)"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: rgb(255,255,0)"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: rgb(200,200,0)"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: rgb(225,100,0)"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: rgb(255,0,0)"></i><span>90+</span><br>';

  return div;
};

legend.addTo(myMap);



 




