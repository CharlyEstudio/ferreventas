import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

// Modelos
import { Gps } from '../models/usuario.model';

// Servicios
import { UsuarioService } from '../services/usuario.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  usuario: Gps;
  asesores: Gps[] = [];
  coneccion: boolean;
  vigilando: any;

  constructor(
    private toastController: ToastController,
    private usuarioService: UsuarioService,
    private ws: WsService
  ) {
    this.usuario = this.usuarioService.gps;
    this.obtenerAsesores();
  }

  ngOnInit() {
  }

  obtenerAsesores() {
    this.usuarioService.solicitarAsesores().then((resp: any) => {
      resp.subscribe((users: any) => {
        if (users.status) {
          if (users.resp.ok) {
            this.coneccion = true;
            this.asesores = users.resp.usuarios;
            for (const asesor of this.asesores) {
              if (asesor.idFerrum === this.usuario.idFerrum) {
                this.vigilando = asesor.nombre;
                break;
              }
            }
          } else {
            this.coneccion = false;
          }
        } else {
          this.coneccion = false;
        }
      });
    });
  }

  cambiarRuta(ruta: any) {
    this.usuarioService.cambiarRuta(this.usuario._id, ruta).then((resp: any) => {
      resp.subscribe((cambio: any) => {
        if (cambio.ok) {
          localStorage.setItem('usuario', JSON.stringify(cambio.usuario));
          this.usuarioService.setLocalData('usuario', cambio.usuario);
          this.usuario = cambio.usuario;
          this.confirmar();
          for (const asesor of this.asesores) {
            if (asesor.idFerrum === this.usuario.idFerrum) {
              this.vigilando = asesor.nombre;
              break;
            }
          }
        }
      });
    });
  }

  async confirmar() {
    const toast = await this.toastController.create({
      header: 'Importante',
      message: 'Para ver los clientes del asesor, se necesita deslizar para actualizar en la lista de clientes.',
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          side: 'start',
          text: 'Ok',
          cssClass: 'text-toast-white',
          handler: () => {}
        }
      ]
    });
    toast.present();
  }

}
