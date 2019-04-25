import { Component } from '@angular/core';

// Plugins
import { Storage } from '@ionic/storage';

// Servicios
import { GeoService } from '../services/geo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  clientes: any[] = [];
  title = 'My first AGM project';
  lat = 0;
  lng = 0;

  constructor(
    private storage: Storage,
    private geo: GeoService
  ) {
    /*this.geo.ubicacionGPS().then((coords: any) => {
      this.lat = coords.coords.latitude;
      this.lng = coords.coords.longitude;
    });*/
    this.storage.get('clientes').then(stored => {
      this.clientes = JSON.parse(stored);
      const indice = this.clientes.length / 2;
      this.lat = this.clientes[indice].lat;
      this.lng = this.clientes[indice].lng;
    });
  }
}
