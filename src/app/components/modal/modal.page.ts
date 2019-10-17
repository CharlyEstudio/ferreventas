import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { UsuarioService } from '../../services/usuario.service';
import { ToastController } from '@ionic/angular';
import { WsService } from 'src/app/services/ws.service';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  dato: any;
  tipo: any;
  fecha: any;
  hora: any;

  constructor(
    private router: ActivatedRoute,
    private toastController: ToastController,
    private route: Router,
    private usuario: UsuarioService,
    private gps: GeoService,
    private ws: WsService
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
  }

  ngOnInit() {
  }

  accion(accion: any) {
    this.tipo = accion;

  }

  enviar(texto: any) {
    if (this.tipo === undefined) {
      this.avisos('Falto colocar un tipo de acción.');
      return;
    }

    this.fecha = this.usuario.getDìa();
    this.hora = this.usuario.getHora();
    this.gps.gps().then((coords: any) => {
      const data = {
        hora: this.hora,
        fecha: this.fecha,
        origen: `${coords.coords.latitude},${coords.coords.longitude}`,
        destino: `${this.dato.lat},${this.dato.lng}`,
        clienteid: this.dato.clienteid,
        idFerrum: this.usuario.gps.idFerrum,
        id: this.usuario.gps._id
      };

      this.ws.distancia(data).then((resp: any) => {
        resp.subscribe((info: any) => {
          if (info.status) {
            if (info.resp.visita) {
              this.confirmar(texto);
            } else {
              this.avisos('Tu ubicación no esta con el cliente, se registra como NO VISITADO, distancia: '
              + info.resp.resp.distancia + ' ' + info.resp.resp.tipo);
              setTimeout(() => this.confirmar(texto), 5050);
            }
          }
        });
      });
    });
  }

  async confirmar(msg: any) {
    const toast = await this.toastController.create({
      header: '¿Se procede a enviar comentario?',
      message: 'Comentario: \n' + msg,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          side: 'start',
          text: 'Si',
          cssClass: 'text-toast-white',
          handler: () => {
            const mensaje = {
              numero: this.dato.numero,
              asesor: this.dato.perid,
              accion: this.tipo,
              comentario: msg,
              fecha: this.fecha,
              hora: this.hora
            };
            this.usuario.enviarComentario(mensaje).then((resp: any) => {
              resp.subscribe((ms: any) => {
                if (ms.status) {
                  this.avisos('Se realizo el envio.');
                  setTimeout(() => {
                    this.route.navigate(['/cliente', JSON.stringify(this.dato)]);
                  }, 1000);
                } else {
                  this.avisos('Error al guardado.');
                }
              });
            });
          }
        }, {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.avisos('Se cancelo el envío.');
          }
        }
      ]
    });
    toast.present();
  }

  avisos(msg: any) {
    const toast = this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.then((to) => to.present());
  }

}
