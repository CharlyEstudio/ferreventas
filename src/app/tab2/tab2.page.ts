import { Component } from '@angular/core';

// Plugins
import { Storage } from '@ionic/storage';

// Servicios
import { GeoService } from '../services/geo.service';
import { NetworkService } from '../services/network.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  clientes: any[] = [];
  lat = 0;
  lng = 0;

  constructor(
    private usuario: UsuarioService,
    private geo: GeoService,
    private net: NetworkService
  ) {
    this.usuario.getLocalData('cliente').then((cli: any) => {
      this.clientes = cli;
      const indice = this.clientes.length / 2;
      this.lat = this.clientes[indice].lat;
      this.lng = this.clientes[indice].lng;
    });
  }

  status() {}
}
