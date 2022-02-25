

/*géolocaliser un utilisateur*/

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;

    console.log('Votre position actuelle est :');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`); 
    console.log(`La précision est de ${crd.accuracy} mètres.`);
    initMap(crd.latitude, crd.longitude);
}

function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options); 



function initMap(lat,lng){

const map = L.map('carte').setView([lat, lng], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/*mettre un marqueur sur la carte avec message dans popup*/

        L.marker([lat, lng]).addTo(map)
            .bindPopup('Votre position.')
            .openPopup();

        L.circle([lat, lng], {radius: 1000, color:"red"}).addTo(map);

        L.marker([50.75605828465049, 2.5211219850461934]).addTo(map)
            .bindPopup('Salut.<br> Tu es Ici.')
            .openPopup();
        
/*mettre un cercle autour du marqueur avec un rayon defini et une couleur*/

        L.circle([50.75605828465049, 2.5211219850461934], {radius: 1000, color:"red"}).addTo(map);

// On active la gestion d'itinéraires

        L.Routing.control({
            geocoder: L.Control.Geocoder.nominatim(),
            lineOptions: {
                styles: [{
                    color: '#42FF33 ',
                    opacity: 1,
                    weight: 7
                }]
            },
            router: new L.Routing.osrmv1({
                language: 'fr'
            })
        }).addTo(map)


const layerGroupMarker = L.layerGroup().addTo(map);

/*effacer le marqueur précedent et ajouter un nouveau à chaque nouveau clique sur la carte*/

map.on('click', function (e) {
    //map.setZoom(17);
    layerGroupMarker.clearLayers();
    const marker = L.marker([e.latlng.lat, e.latlng.lng])
        .bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        .openPopup();
    layerGroupMarker.addLayer(marker);
    map.setView([e.latlng.lat,e.latlng.lng], 11);


});
}