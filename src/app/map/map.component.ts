import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

//Required to handle leaflet bug in angular that loses the icon assets
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor(){

  }

  title = 'echarge';

  ngOnInit() {

    //If geolocation is not supported on device, console.log it - maybe provide default coords
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    //Use the javascript geolocation API to determine the user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];

      //initialize the map, location, and zoom level
      let mymap = L.map('map').setView([latLong[0],latLong[1]], 12);

      //add map background from open street map
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

    //Get user location as a popup
    let popup = L.popup()
      .setLatLng([latLong[0],latLong[1]])
      .setContent('Your Location')
      .openOn(mymap);

      //NREL API query - get up to 200 charging stations within 10miles of your current location
      let url = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=o4lBmdpQU49LBZa9KP8VOd3qcybIPN9L0olJ2ygK&fuel_type=ELEC&latitude=${latLong[0]}&longitude=${latLong[1]}&radius=10&limit=200`

      //for each station returned from API query, add a marker to map
      fetch(url).then(response => response.json()).then(data => { data.fuel_stations.forEach((station: { latitude: number; longitude: number; station_name: L.Popup | L.Content | ((layer: L.Layer) => L.Content); }) => {
        L.marker([station.latitude, station.longitude]).addTo(mymap).bindPopup(station.station_name)
      })
    })
  });
  this.watchPosition();
  }

  //function to watch user's location and update it on the map - only really works with gps enabled devices
  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}