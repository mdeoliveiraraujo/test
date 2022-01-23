import { Component, OnInit } from '@angular/core';

import { Loader } from '@googlemaps/js-api-loader';
import { Observable } from 'rxjs';


import { LocationService } from '../location.service';

import { RequisitionModel } from '../shared/requisition.model';

@Component({
  selector: 'app-setrules',
  templateUrl: './setrules.component.html',
  styleUrls: ['./setrules.component.css'],
  providers: [LocationService]
})
export class SetrulesComponent implements OnInit {
  submitted = false;
  terminado = true;
  playback = new Audio();

  sounds = ['Rooster', 'Nuclear', 'Bip'];

  model = new RequisitionModel(0, { lat: -31.00000, lng: 50.00000 }, "Rooster");
  //public raio: number = 0;
  classesObj: Object;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {

    let loader = new Loader({
      apiKey: ''
    });

    loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            //const pos = {
            this.model.coords.lat = position.coords.latitude;
            this.model.coords.lng = position.coords.longitude;
            //console.log(this.model.coords.lat);
            //};
            map.setCenter({ lat: this.model.coords.lat, lng: this.model.coords.lng });
          }
        );
      }

      const originalMapCenter = new google.maps.LatLng({ lat: -30.014866, lng: -51.143374 });
      // const originalMapCenter = new google.maps.LatLng(this.pos);
      const map = new google.maps.Map(document.getElementById("map"), {
        // center: originalMapCenter,
        zoom: 13,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#523735"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#c9b2a6"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#dcd2be"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ae9e90"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#93817c"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#a5b076"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#447530"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#fdfcf8"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f8c967"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#e9bc62"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e98d58"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#db8555"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#806b63"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8f7d77"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#b9d3c2"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#92998d"
              }
            ]
          }
        ]
      });

      let mapMarker = new google.maps.Marker({
        position: originalMapCenter,
        map,
        title: 'This is my app.'
      });

      let mapCircle = new google.maps.Circle({
        strokeColor: 'red',
        map: map,
        center: originalMapCenter,
        radius: this.model.radius * 1000,
        strokeOpacity: 0.4,
        fillColor: 'red',
        fillOpacity: 0.1
      });

      mapMarker.setMap(null);
      mapCircle.setMap(null);

      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {

        mapMarker.setMap(null);
        mapCircle.setMap(null);

        //this.model.coords= mapsMouseEvent.latLng;
        this.model.coords = mapsMouseEvent.latLng.toJSON();
        //mapsMouseEvent.latLng.toJSON());

        if (this.model.radius) {
          mapCircle = new google.maps.Circle({
            center: this.model.coords,//mapsMouseEvent.latLng,
            radius: this.model.radius * 1000,
            map: map,
            strokeColor: 'red',
            strokeOpacity: 0.4,
            fillColor: 'red',
            fillOpacity: 0.1
          });
          mapMarker = new google.maps.Marker({
            position: this.model.coords,//mapsMouseEvent.latLng,
            map: map,
            title: 'Your destination'
          });
        }
      });
    });
  }

  getPosition(): Observable<any> {
    return new Observable(observer => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => observer.error(error));
    });
  }

  calculateDistance() {
    var R = 6371; // Radius of the earth in km
    let lat1 = this.model.coords.lat;
    let lon1 = this.model.coords.lng;
    let lat2 = -31;
    let lon2 = -52;
    var dLat = (lat2 - lat1) * Math.PI / 180;  // Javascript functions in radians
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log(d);
  }

  onPlaySound() {
    this.playback.src = `../../assets/${this.model.sound}.mp3`
    this.playback.load();
    this.playback.play();
    this.terminado = false;
    this.calculateDistance();
  }

  onSubmit() {
    this.submitted = true;
    console.log("HERE!!!!")
  }
}
