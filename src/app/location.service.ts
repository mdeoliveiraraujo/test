import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    getLocation(): any {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                if (position) {
                    const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
                    // console.log('Passei aqui. ' + pos[0] + ' ' + pos[1]);
                    return pos;
                }
            }, (error: GeolocationPositionError) => console.log(error)
            );
        } else {
            alert('Geolocation is not supported by this browser.')
            return null;
        }
    }
}