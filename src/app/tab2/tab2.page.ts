import { Component } from '@angular/core';

// Plugins
import { Storage } from '@ionic/storage';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  clientes: any[] = [];
  lat = 0;
  lng = 0;
  estado = true;
  panControl = true;
  mapTypeControl = true;

  constructor(
    private usuario: UsuarioService,
    public ws: WsService
  ) {
    this.usuario.getLocalData('cliente').then((cli: any) => {
      this.clientes = cli;
      const indice = Math.round(this.clientes.length / 2);
      this.lat = this.clientes[indice].lat;
      this.lng = this.clientes[indice].lng;
    });
  }

  doSomethingWithTheMapInstance(event: any) {
    console.log(event);
  }
}
