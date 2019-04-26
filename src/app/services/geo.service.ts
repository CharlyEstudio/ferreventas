import { Injectable } from '@angular/core';

// Plugins
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(
    private geolocation: Geolocation
  ) { }

  ubicacionGPS() {
    // return this.geolocation.getCurrentPosition();
    return this.geolocation.watchPosition();
  }

  gps() {
    return this.geolocation.getCurrentPosition();
  }
}
