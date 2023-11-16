const ironhackCoords = { lat: 40.392521370648154, lng: - 3.6989879718518366 }
let myMap

function init() {
    renderMap()
    getPlacesFromAPI()
}

function renderMap() {
    myMap = new google.maps.Map(document.querySelector("#myMap"), {
        zoom: 10,
        center: ironhackCoords
    })
}

function getPlacesFromAPI() {
    axios
        .get("/api/events")
        .then(places => printPlacesMarkers(places.data))
        .catch(err => console.log(err))
}

function printPlacesMarkers(places) {
    places.forEach(elm => {
        const position = { lat: elm.place.coordinates[1], lng: elm.place.coordinates[0] }

        new google.maps.Marker({
            map: myMap,
            position,
            title: elm.name
        })
    })
}