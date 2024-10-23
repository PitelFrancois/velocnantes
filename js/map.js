class Carte {
    constructor(url) {
        this.url = url ;
        this.chargementDeLaCarte() ;
        this.apiJcdecaux() ;
    };

    /* Execution de la requête */

    apiJcdecaux() {
        this.jcdecauxRequest = new XMLHttpRequest() ;
        this.jcdecauxRequest.open("GET", this.url) ;
        this.jcdecauxRequest.addEventListener("load", () => {
            if (this.jcdecauxRequest.status >= 200 && this.jcdecauxRequest.status < 400) {
                this.data = JSON.parse(this.jcdecauxRequest.responseText) ;
                console.log(this.data) ;
                this.chargementMarqueurs() ; 
            } else {
                console.error(this.jcdecauxRequest.status + " " + this.jcdecauxRequest.statusText + " " + this.url) ;
            }
        }) ;
        this.jcdecauxRequest.addEventListener("error", () => {
            console.error("Erreur réseau avec l'url " + this.url) ;
        }) ;
        this.jcdecauxRequest.send(null) ;
    } ;

    /* Initiation de la carte */

    chargementDeLaCarte() {
        this.maCarte = L.map('mapid').setView([47.215888, -1.558380], 14) ;
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJhbmNvaXM0NDg3IiwiYSI6ImNrNmFqaXQxcTA1eDQzZXBpMDhvNjViMXcifQ.hQ1AtF-av1u_a92QkpPucQ', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'your.mapbox.access.token'
        }).addTo(this.maCarte);
    } ;

    /* Gestion et ajout des marqueurs */

    chargementMarqueurs() {
        let data = this.data;
        for (let i = 0; i < data.length ; i++) {
            let station = data[i];
            let lat= data[i].position.lat;
            let lng= data[i].position.lng;
         
        let icon = "images/marker1.png";
            if (station.status === "CLOSED" || station.available_bikes === 0 || station.bike_stands === 0) {
                icon = "images/marker2.png" ;
            }
        let mesIcones = L.icon({
            iconUrl: icon,
            iconSize: [35, 35],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });

        if (station.status === "OPEN") {
             station.status = "OUVERTE";
        } if (station.status === "CLOSED") {
            station.status = "FERMÉE";
        };

        let marker = L.marker([lat, lng],{icon: mesIcones}).addTo(this.maCarte);
        
        marker.addEventListener("click", () => {   
            marker.bindPopup("<b>"+station.name+"</b>" + "<br>"+"Adresse : "+ station.address + "<br>"+"Statut de la station : "+ station.status +"</br>"+"Vélos disponibles : "+ station.available_bikes +"</br>" +"Places disponibles : "+ station.bike_stands +"</br>").openPopup() ;
            this.dataSelection = new Array ;
            this.dataSelection.push(data[i]) ;
            let infoStatut = document.querySelector("#station_status") ;
            let infoNom = document.querySelector("#station_nom") ; 
            let infoAdresse = document.querySelector("#station_adresse") ; 
            let infoPlaces = document.querySelector("#station_places") ; 
            let infoVelos = document.querySelector("#station_velos") ;
            infoStatut.innerText = station.status ; 
            infoNom.innerText = station.name ;
            infoAdresse.innerText = station.address ;
            infoPlaces.innerText = station.bike_stands ;
            infoVelos.innerText = station.available_bikes ;       
        }) ;
        } ;
    } ;
    
};
