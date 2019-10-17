import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

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
    public menuCtrl: MenuController,
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

  toggleMenu() {
    this.menuCtrl.toggle(); // Add this method to your button click function
  }

  doSomethingWithTheMapInstance(event: any) {
    console.log(event);
  }
}
