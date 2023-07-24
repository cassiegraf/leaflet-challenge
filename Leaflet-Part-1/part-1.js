// data includes all earthquakes in the past day - updated every minute
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(url).then(function (data) {
    console.log(data.features);

    createFeatures(data.features);
})

function createFeatures(earthquakeData) {
    console.log("Earthquake Data:")
    console.log(earthquakeData);
}

function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><h4>Magnitude: ${feature.properties.mag} | Depth: ${feature.geometry.coordinates[2]}<h4>`);
    
    let earthquakes = L.geoJSON(earthquakeData, {
        style: circle, 
        onEachFeature: onEachFeature
        })

    // create circle marker, bind the location, magnitude, and depth from the data
    let circle = L.circleMarker([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], {
        radius: feature.geometry.coordinates[2],
        color: getColor,
        opacity: 0.5
    })

        createMap(earthquakes);

}

    function getColor(depth) {
        switch (true) {
          case depth > 90:
            return "#EA2C2C";
          case depth > 70:
            return "#EA822C";
          case depth > 50:
            return "#EE9C00";
          case depth > 30:
            return "#EECC00";
          case depth > 10:
            return "#D4EE00";
          default:
            return "#98EE00";
        }
      } 
    




    
function createMap(earthquakes) {

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
          
    // create map, centered on Denver, add layers
    let myMap = L.map("map", {
    center: [
        39.7643389,-104.8551114
    ],
    zoom: 4.5,
    layers: [
        street,    
        earthquakes,
        circle
    ]
    })}


    // create the legend
    let legend = L.control({
    position: "bottomright"
    })
    
        
    

   



  







