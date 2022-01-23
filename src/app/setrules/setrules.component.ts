import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { map } from 'rxjs';

@Component({
  selector: 'app-setrules',
  templateUrl: './setrules.component.html',
  styleUrls: ['./setrules.component.css']
})
export class SetrulesComponent implements OnInit {
  public raio: number = 0;
  constructor() { }

  //const mapinha: google.maps.Map;

  ngOnInit(): void {

    let loader = new Loader({
      apiKey: 'i changed this. '
    });

    loader.load().then(() => {
      const originalMapCenter = new google.maps.LatLng({ lat: -30.014866, lng: -51.143374 });
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -30.014866, lng: -51.143374 },
        zoom: 15,
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
      })

      let mapMarker = new google.maps.Marker({
        position: originalMapCenter,
        map,
        title: 'This is my app.'
      });

      let mapCircle = new google.maps.Circle({
        strokeColor: 'red',
        map: map,
        center: originalMapCenter,
        radius: this.raio*1000,
        strokeOpacity: 0.4,
        fillColor: 'red',
        fillOpacity: 0.1
      })

      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {

        console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
        console.log(this.raio);
        // Close the current InfoWindow.
        mapMarker.setMap(null);
        mapCircle.setMap(null);
        mapCircle = new google.maps.Circle({
          center: mapsMouseEvent.latLng,
          radius: this.raio*1000,
          map: map,
          strokeColor: 'red',
          strokeOpacity: 0.4,
          fillColor: 'red',
          fillOpacity: 0.1
        });
        mapMarker = new google.maps.Marker({
          position: mapsMouseEvent.latLng,
          map: map,
          title: 'Your destination'
        });
      });
    });
  }

  getRaio(event: any) {
    this.raio = event.target.value;
  }
}
