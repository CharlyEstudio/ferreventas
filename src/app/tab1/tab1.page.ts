import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Plugins
import { Storage } from '@ionic/storage';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { ImeiService } from '../services/imei.service';
import { Platform } from '@ionic/angular';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Datos del Usurio
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
    public ws: WsService,
    private usuario: UsuarioService,
    private imeiSer: ImeiService
  ) {
    this.current = 'Gerencia';
    this.message = 'Reunión mensual este 4 de Mayo a las 8:30 a.m., siempre los mejores!';
  }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.doRefresh(true);
    });
  }

  doRefresh(refresh: boolean = false, refresher?: any) {
    if (this.plt.is('cordova')) {
      this.imeiSer.getImeiN().then((imei) => {
        this.usuario.usuario(refresh, imei).subscribe(((use: any) => {
          console.log(use.idFerrum);
          this.usuario.clientes(refresh, use.idFerrum).subscribe((cli: any) => {
            if (cli.length !== 0) {
              this.client = cli;
              this.msg = 'ACTIVO';
            } else {
              this.msg = 'Sin Clientes';
            }
          });
        }));
      });
    } else {
      this.imei = 359270078018344;
      // this.imei = 123456;
      this.usuario.usuario(refresh, this.imei).subscribe((use: any) => {
        this.usuario.clientes(refresh, use.idFerrum).subscribe((cli: any) => {
          if (cli.length !== 0) {
            this.client = cli;
            this.msg = 'ACTIVO';
          } else {
            this.msg = 'Sin Clientes';
          }
        });
      });
    }

    if (refresher) {
      refresher.target.complete();
    }
  }

  irA(cli: any) {
    this.router.navigate(['/cliente', JSON.stringify(cli)]);
  }

}
