// data includes all earthquakes in the past day - updated every minute
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(url).then(function (data) {
    console.log(data.features);

    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    console.log("Earthquake Data:")
    console.log(earthquakeData);

    // bind the location, magnitude, and depth from the data
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag} | Depth: ${feature.geometry.coordinates[2]}<p>`);
      }
    
      let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      });

      createMap(earthquakes);
    }
    
    function createMap(earthquakes) {

        let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          });
        
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

  // Add the layer control to the map.
  L.control.layers(overlayMaps).addTo(myMap);

}


