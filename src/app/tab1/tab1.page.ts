import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Plugins
import { Storage } from '@ionic/storage';

// Servicios
import { ClientesService } from '../services/clientes.service';
import { UsuarioService } from '../services/usuario.service';
import { ImeiService } from '../services/imei.service';
import { Platform } from '@ionic/angular';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  status = false;

  // Datos del Usurio
  user: any;
  idFerrum: number;
  imei: number;

  // Mensaje del día
  current: any;
  message: any;

  // Clientes del día
  client: any[] = [];
  msg: any;

  constructor(
    private plt: Platform,
    private router: Router,
    private storage: Storage,
    public ws: WsService,
    private clientes: ClientesService,
    private usuario: UsuarioService,
    private imeiSer: ImeiService
  ) {
    this.load();
    this.current = 'Gerencia';
    this.message = 'Reunión mensual este 4 de Mayo a las 8:30 a.m., siempre los mejores!';
  }

  load() {
    if (this.plt.is('cordova')) {
      this.imeiSer.getImeiN().then((imei) => {
        this.usuario.usuario(imei).subscribe((use: any) => {
          this.user = use;
          this.idFerrum = use.idFerrum;
          this.clientes.clientes(this.idFerrum).subscribe((cli: any) => {
            if (cli.length !== 0) {
              this.client = cli;
              this.msg = 'ACTIVO';
              this.storage.set('clientes', JSON.stringify(cli));
            } else {
              this.msg = 'Sin Clientes';
            }
          });
        });
      });
    } else {
      // this.imei = 359270078018344;
      this.imei = 123456;
      this.usuario.usuario(this.imei).subscribe((use: any) => {
        this.user = use;
        this.idFerrum = use.idFerrum;
        this.clientes.clientes(this.idFerrum).subscribe((cli: any) => {
          if (cli.length !== 0) {
            this.client = cli;
            this.msg = 'ACTIVO';
            this.storage.set('clientes', JSON.stringify(cli));
          } else {
            this.msg = 'Sin Clientes';
          }
        });
      });
    }
  }

  doRefresh(event: any) {
    // Eliminar base de datos y actualizar
    this.storage.remove('clientes');
    this.load();

    setTimeout(() => {
      console.log('Se actualizo');
      event.target.complete();
    }, 2000);
  }

  irA(cli: any) {
    this.router.navigate(['/cliente', JSON.stringify(cli)]);
  }

}
