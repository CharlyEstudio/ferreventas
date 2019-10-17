import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

// Servicios
import { WsService } from '../services/ws.service';
import { UsuarioService } from '../services/usuario.service';
import { ImeiService } from '../services/imei.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  activado: boolean;

  // Datos del Usurio
  imei: any;

  msg: any;

  constructor(
    private plt: Platform,
    private tstController: ToastController,
    private usuario: UsuarioService,
    private imeiSer: ImeiService,
    public ws: WsService
  ) {
    this.ws.escuchar('usuario-cambio').subscribe((cambios: any) => {
      if (this.usuario.gps.idFerrum === cambios.idFerrum) {
        if (cambios.activo === 'NOT') {
          this.activado = false;
        } else {
          this.activado = true;
        }
      }
    });
    if (this.plt.is('cordova')) {
      this.imeiSer.getImeiN().then((imei: any) => {
        this.imei = imei;
        this.usuario.usuario(false, imei).then((resp: any) => {
          resp.subscribe((em: any) => {
            if (em.status) {
              if (em.usuario.activo !== 'NOT') {
                this.activado = true;
              } else {
                this.activado = false;
              }
            } else {
              this.msg = '';
              if (em.imei !== 0) {
                this.mostrarMensaje('Cargando...');
              } else {
                this.mostrarMensaje(em.msg);
              }
            }
          });
        });
      });
    } else {
      this.imei = 359270078018344;
      this.usuario.usuario(false, this.imei).then((resp: any) => {
        if (resp.activo) {
          if (resp.activo === 'YES') {
            this.activado = true;
          } else {
            this.activado = false;
          }
        } else {
          resp.subscribe((em: any) => {
            if (em.status) {
              if (em.usuario.activo !== 'NOT') {
                this.activado = true;
              } else {
                this.activado = false;
              }
            } else {
              this.msg = '';
              if (em.imei !== 0) {
                this.mostrarMensaje('Cargando...');
              } else {
                this.mostrarMensaje(em.msg);
              }
            }
          });
        }
      });
    }
  }

  mostrarMensaje(mensaje: string) {
    const toast = this.tstController.create({
      message: mensaje,
      position: 'middle',
      duration: 3000,
      color: 'danger'
    });
    toast.then((c) => c.present());
  }
}
