import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// Plugins
import { Network } from '@ionic-native/network/ngx';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { ImeiService } from '../services/imei.service';
import { WsService } from '../services/ws.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Equipo activado
  activado: boolean;

  // Datos del Usurio
  imei: any;
  aviso: any;

  // Tipo de conexion
  tipo: any;

  // Mensaje del día
  current: any = '';
  message: any = '';

  // Clientes del día
  client: any[] = [];
  msg: any;

  // Ver datos local
  local: any[] = [];

  constructor(
    private storage: Storage,
    private plt: Platform,
    private tstController: ToastController,
    private router: Router,
    public ws: WsService,
    private usuario: UsuarioService,
    private imeiSer: ImeiService,
    private net: Network,
    private netService: NetworkService
  ) {
    if (localStorage.getItem('mensaje')) {
      const msg = JSON.parse(localStorage.getItem('mensaje'));
      this.current = msg.de;
      this.message = msg.cuerpo;
    }
    this.ws.escuchar('mensaje-privado').subscribe((msg: any) => {
      this.current = msg.de;
      this.message = msg.cuerpo;
    });
    this.ws.escuchar('usuario-cambio').subscribe((cambios: any) => {
      if (this.usuario.gps.idFerrum === cambios.idFerrum) {
        if (cambios.activo === 'NOT') {
          this.activado = false;
        } else {
          this.activado = true;
          this.usuario.usuario(true, this.imei).then((resp: any) => {
            resp.subscribe((em: any) => {
              if (em.status) {
                if (em.usuario.activo !== 'NOT') {
                  this.activado = true;
                  if (em.ferrum.length > 0) {
                    this.client = em.ferrum;
                    this.msg = 'ACTIVO';
                  } else {
                  this.msg = 'Sin Clientes';
                  }
                } else {
                  this.activado = false;
                }
              } else {
                this.msg = '';
                if (em.imei !== 0) {
                  this.mostrarMensaje('Activando Equipo...');
                } else {
                  this.mostrarMensaje(em.msg);
                }
              }
            });
          });
        }
      }
    });
  }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.doRefresh(true);
    //   if (this.net.type === 'wifi') {
    //     this.tipo = 'WiFi';
    //   } else if (this.net.type === '2g') {
    //     this.tipo = '2G';
    //   } else if (this.net.type === '3g') {
    //     this.tipo = '3G';
    //   } else if (this.net.type === '4g') {
    //     this.tipo = '4G';
    //   } else if (this.net.type === 'cellular') {
    //     this.tipo = 'Celular';
    //   } else if (this.net.type === 'none') {
    //     this.tipo = 'none';
    //   } else if (this.net.type === 'unknown') {
    //     this.tipo = 'Desconocido';
    //   } else if (this.net.type === 'ethernet') {
    //     this.tipo = 'Ethernet';
    //   }
    //   this.net.onchange().subscribe(() => {
    //     if (this.net.type === 'wifi') {
    //       this.tipo = 'WiFi';
    //     } else if (this.net.type === '2g') {
    //       this.tipo = '2G';
    //     } else if (this.net.type === '3g') {
    //       this.tipo = '3G';
    //     } else if (this.net.type === '4g') {
    //       this.tipo = '4G';
    //     } else if (this.net.type === 'cellular') {
    //       this.tipo = 'Celular';
    //     } else if (this.net.type === 'none') {
    //       this.tipo = 'none';
    //     } else if (this.net.type === 'unknown') {
    //       this.tipo = 'Desconocido';
    //     } else if (this.net.type === 'ethernet') {
    //       this.tipo = 'Ethernet';
    //     }
    //   });
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
        this.imei = imei;
        this.usuario.usuario(refresh, imei).then((resp: any) => {
          resp.subscribe((em: any) => {
            if (em.status) {
              if (em.usuario.activo !== 'NOT') {
                this.activado = true;
                if (em.ferrum.length > 0) {
                  this.client = em.ferrum;
                  this.msg = 'ACTIVO';
                } else {
                this.msg = 'Sin Clientes';
                }
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
        // this.usuario.usuario(refresh, imei).subscribe((use: any) => {
        //   if (use.status) {
        //     this.usuario.clientes(refresh, use.respuesta.idFerrum)
        //     .subscribe((cli: any) => {
        //       if (cli.length !== 0) {
        //         this.client = cli;
        //         this.msg = 'ACTIVO';
        //       } else {
        //         this.msg = 'Sin Clientes';
        //       }
        //     }, error => this.mostrarMensaje(error.message));
        //   } else {
        //     this.msg = use.msg;
        //     this.mostrarMensaje(use.msg);
        //   }
        // }, error => this.mostrarMensaje(error.error));
      });
    } else {
      this.imei = 359270078018344;
      this.usuario.usuario(refresh, this.imei).then((resp: any) => {
        resp.subscribe((em: any) => {
          if (em.status) {
            if (em.usuario.activo !== 'NOT') {
              this.activado = true;
              if (em.ferrum.length > 0) {
                this.client = em.ferrum;
                this.msg = 'ACTIVO';
              } else {
              this.msg = 'Sin Clientes';
              }
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
      // this.usuario.usuario(refresh, this.imei).then((use: any) => {
      //   if (use.status) {
      //     this.usuario.clientes(refresh, use.respuesta.idFerrum).subscribe((cli: any) => {
      //       if (cli.length !== 0) {
      //         this.client = cli;
      //         this.msg = 'ACTIVO';
      //       } else {
      //         this.msg = 'Sin Clientes';
      //       }
      //     }, error => this.mostrarMensaje(error.message));
      //   } else {
      //     this.msg = '';
      //     this.mostrarMensaje(use.msg);
      //   }
      // }, error => this.mostrarMensaje(error.error));
    }

    if (refresher) {
      refresher.target.complete();
    }
  }

  irA(cli: any) {
    this.router.navigate(['/cliente', JSON.stringify(cli)]);
  }

  verLocal() {
    this.local = JSON.parse(localStorage.getItem('mensaje-visita'));
  }

  borrarStorage() {
    this.local = [];
    localStorage.removeItem('mensaje-visita');
    this.storage.remove('localData-mensaje-visita');
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
