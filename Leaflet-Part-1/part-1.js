// data includes all earthquakes in the past day - updated every minute
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(url).then(function (data) {
    console.log(data.features);

    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    console.log("Earthquake Data:")
    console.log(earthquakeData);

    //bind the location and magnitude from the data
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><h4>Magnitude: ${feature.properties.mag} | Depth:${feature.geometry.coordinates[2]}<h4>`);
    }

      let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
      });

      createMap(earthquakes);
    }

    function createMap(earthquakes) {

        let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })

          let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          });



  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // centered map at Denver, CO coordinates
  let myMap = L.map("map", {
    center: [
        39.7643389,-104.8551114
    ],
    zoom: 4.5,
    layers: [street, earthquakes]
  });

  //function getColor(depth) {
  //  switch (true) {
  //    case depth > 90:
  //      return "#EA2C2C";
  //    case depth > 70:
  //      return "#EA822C";
  //    case depth > 50:
  //      return "#EE9C00";
  //    case depth > 30:
  //      return "#EECC00";
  //    case depth > 10:
  //      return "#D4EE00";
  //    default:
  //      return "#98EE00";
  //  }
  //}


  //for (let i = 0; i < earthquakeData.geometry.length; i++) {
  //  let color = "";
  //  if (earthquakeData.geometry[i].coordinates[2] < 20) {
  //    color = "yellow";
  //  }
  //  else if (earthquakeData.geometry[i].coordinates[2] > 20) {
  //    color = "green";
  //  }
  //  else {
  //    color = "blue";
  //  }

  //}

  //L.circle(feature.geometry.coordinates, {
  //  fillOpacity: 0.5,
  //  color: "white",
  //  fillColor: color,
  //  radius: Math.sqrt(feature.geometry[i].coordinates[2]) *500
  //}).bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><h4>Magnitude: ${feature.properties.mag} | Depth:${feature.geometry.coordinates[2]}<h4>`).addTo(myMap);
    
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

