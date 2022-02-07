import { Component, OnDestroy, OnInit } from '@angular/core';

import { Loader } from '@googlemaps/js-api-loader';
import { Observable } from 'rxjs';
import { Form, FormsModule, FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { interval, Subscription, lastValueFrom } from 'rxjs';

import { LocationService } from '../location.service';

import { RequisitionModel } from '../shared/requisition.model';

@Component({
  selector: 'app-setrules',
  templateUrl: './setrules.component.html',
  styleUrls: ['./setrules.component.css'],
  providers: [LocationService]
})
export class SetrulesComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  terminado: boolean = true;
  pinCreated: boolean = false;

  currentPos: GeolocationPosition;

  distance: number = 0;
  intervalId: ReturnType<typeof setInterval>;

  playback = new Audio();

  map: google.maps.Map;
  mapCircle: google.maps.Circle;
  mapMarker: google.maps.Marker;

  sounds = ['Rooster', 'Nuclear', 'Bip'];

  model = new RequisitionModel(0, { lat: -31.00000, lng: 50.00000 }, "Rooster");

  myForm!: FormGroup;
  //public raio: number = 0;

  constructor(private locationService: LocationService, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {

    this.myForm = new FormGroup({
      'radius': new FormControl(null, [Validators.required, Validators.min(0.1), Validators.max(50.0)]),
      'latitude': new FormControl(null, [Validators.required]),
      'longitude': new FormControl(null, [Validators.required]),
      'sound': new FormControl('Rooster', [Validators.required])
    });

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
            this.currentPos = position;
            (<FormControl>this.myForm.controls['latitude'])
              .setValue(this.model.coords.lat.toFixed(5), { emitEvent: false });
            (<FormControl>this.myForm.controls['longitude'])
              .setValue(this.model.coords.lng.toFixed(5), { emitEvent: false });
            this.myForm.controls['latitude'].pristine;
            this.myForm.controls['longitude'].pristine;
            this.map.setCenter({ lat: this.model.coords.lat, lng: this.model.coords.lng });
          }
        );
      }

      const originalMapCenter = new google.maps.LatLng({ lat: this.model.coords.lat, lng: this.model.coords.lng });
      // const originalMapCenter = new google.maps.LatLng(this.pos);
      this.map = new google.maps.Map(document.getElementById("map"), {
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

      this.mapMarker = new google.maps.Marker({
        position: originalMapCenter,
        map: this.map,
        title: 'This is my app.'
      });

      this.mapCircle = new google.maps.Circle({
        strokeColor: 'red',
        map: this.map,
        center: originalMapCenter,
        radius: this.model.radius * 1000,
        strokeOpacity: 0.4,
        fillColor: 'red',
        fillOpacity: 0.1
      });

      this.mapMarker.setMap(null);
      this.mapCircle.setMap(null);

      // Configure the click listener.
      this.map.addListener("click", (mapsMouseEvent) => {
        console.log(JSON.stringify(this.currentPos));

        this.mapMarker.setMap(null);
        this.mapCircle.setMap(null);

        //this.model.coords= mapsMouseEvent.latLng;
        this.model.coords = mapsMouseEvent.latLng.toJSON();
        //mapsMouseEvent.latLng.toJSON());

        if (this.model.radius) {
          this.mapCircle = new google.maps.Circle({
            center: this.model.coords,//mapsMouseEvent.latLng,
            radius: this.model.radius * 1000,
            map: this.map,
            strokeColor: 'red',
            strokeOpacity: 0.4,
            fillColor: 'red',
            fillOpacity: 0.1
          });
          this.mapMarker = new google.maps.Marker({
            position: this.model.coords,//mapsMouseEvent.latLng,
            map: this.map,
            title: 'Your destination'
          });
          (<FormControl>this.myForm.controls['latitude']).setValue(this.model.coords.lat.toFixed(5));
          (<FormControl>this.myForm.controls['longitude']).setValue(this.model.coords.lng.toFixed(5));
          this.pinCreated = true;
        }
      });
    });

    this.myForm.get("sound").valueChanges.subscribe(soundForm => {
      console.log('Sound changed: ', soundForm);
    });

    this.myForm.get("radius").valueChanges.subscribe(radiusForm => {
      this.model.radius = radiusForm;
    });

    this.myForm.get("latitude").valueChanges.subscribe(latitudeForm => {
      this.model.coords.lat = latitudeForm;
    });

    this.myForm.get("longitude").valueChanges.subscribe(longitudeForm => {
      this.model.coords.lng = longitudeForm;
    });

    // if (this.submitted){
    this.intervalId = setInterval(() => {
      this.getPosition();
      this.calculateDistance();
      console.log('Distance: ', this.distance);
    }, 10000);
    // console.log('Distancia', this.distance);
    // } else {
    // clearInterval(this.intervalId);
    // }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  getPosition(): Observable<any> {
    return new Observable(observer => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        this.currentPos = position;
        observer.complete();
      },
        error => observer.error(error));
    });
  }

  calculateDistance() {
    // Get new position
    var R = 6371; // Radius of the earth in km
    let lat1 = this.model.coords.lat;
    let lon1 = this.model.coords.lng;
    let lat2 = this.currentPos.coords.latitude;
    let lon2 = this.currentPos.coords.longitude;
    var dLat = (lat2 - lat1) * Math.PI / 180;  // Javascript functions in radians
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    this.distance = d;
  }

  onPlaySound() {
    this.playback.src = `../../assets/${this.model.sound}.mp3`
    console.log('Sound', this.model.sound);
    this.playback.load();
    this.playback.play();
    this.terminado = false;
    this.calculateDistance();
  }

  onSubmit() {
    this.submitted = true;
    console.log("HERE!!!!")
  }

  updateCoords() {
    this.model.coords.lat = this.myForm.controls['latitude'].value;
    this.model.coords.lng = this.myForm.controls['longitude'].value;

    this.mapMarker.setMap(null);
    this.mapCircle.setMap(null);

    this.mapCircle = new google.maps.Circle({
      center: this.model.coords,//mapsMouseEvent.latLng,
      radius: this.model.radius * 1000,
      map: this.map,
      strokeColor: 'red',
      strokeOpacity: 0.4,
      fillColor: 'red',
      fillOpacity: 0.1
    });
    this.mapMarker = new google.maps.Marker({
      position: this.model.coords,//mapsMouseEvent.latLng,
      map: this.map,
      title: 'Your destination'
    });
    this.pinCreated = true;
  }
}
