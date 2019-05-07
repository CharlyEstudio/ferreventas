import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';

// Plugins
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Uid } from '@ionic-native/uid/ngx';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { ImeiService } from '../services/imei.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Datos del Usurio
  imei: any;
  aviso: any;

  // Mensaje del día
  current: any;
  message: any;

  // Clientes del día
  client: any[] = [];
  msg: any;

  constructor(
    private androidPermissions: AndroidPermissions,
    private uid: Uid,
    private plt: Platform,
    private tstController: ToastController,
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

  mensaje(msg: any) {
    const toast = this.tstController.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'danger'
    });
    toast.then(to => to.present());
  }

  doRefresh(refresh: boolean = false, refresher?: any) {
    if (this.plt.is('cordova')) {
      this.imeiSer.getImeiN().then((imei: any) => {
        const toast = this.tstController.create({
          message: imei,
          duration: 2000,
          position: 'middle'
        });
        toast.then(to => to.present());
        this.usuario.usuario(refresh, imei).subscribe(((use: any) => {
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
      // this.imei = 357617084506476;
      // this.imei = 123456;
      this.usuario.usuario(refresh, this.imei).subscribe((use: any) => {
        this.usuario.clientes(refresh, use.idFerrum).subscribe((cli: any) => {
          if (cli.length !== 0) {
            console.log(cli);
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
