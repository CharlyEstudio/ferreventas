import { Injectable } from '@angular/core';

// Plugins
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(
    private geolocation: Geolocation
  ) { }

  ubicacionGPS() {
    return this.geolocation.getCurrentPosition();
  }
}
