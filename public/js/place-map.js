const ironhackCoords = { lat: 40.392521370648154, lng: - 3.6989879718518366 }
let myMap

const hiddenId = document.getElementById('identific').value


function init() {
    renderMap()
    getPlacesFromAPI()
}

function renderMap() {
    myMap = new google.maps.Map(document.querySelector("#myMap"), {
        zoom: 10,
        center: ironhackCoords,
        styles: mapStyles.sincity
    })
}

function getPlacesFromAPI() {
    axios
        .get(`/api/events/${hiddenId}`)
        .then(places => printPlacesMarkers(places.data))
        .catch(err => console.log(err))
}

function printPlacesMarkers(place) {


    const position = { lat: place.place.coordinates[1], lng: place.place.coordinates[0] }

    new google.maps.Marker({
        map: myMap,
        position,
        title: place.name
    })

}