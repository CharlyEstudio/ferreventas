import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// Plugins
import { CallNumber } from '@ionic-native/call-number/ngx';

// Servicios
import { GeoService } from '../services/geo.service';
import { UsuarioService } from '../services/usuario.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  dato: any;
  visita = false;
  hora: any;
  fecha: any;

  constructor(
    private router: ActivatedRoute,
    private toastController: ToastController,
    private route: Router,
    private callNumber: CallNumber,
    private usuario: UsuarioService,
    private gps: GeoService,
    private ws: WsService
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
    if (this.dato.visita === 0) {
      this.visita = false;
    } else {
      this.visita = true;
    }
  }

  ngOnInit() {
  }

  irA(dato: any) {
    this.route.navigate(['viajar', JSON.stringify(dato)]);
  }

  llamar(dato: any) {
    console.log('Estoy llamando...' + dato.tel);
    this.callNumber.callNumber(dato.tel, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  enviarComentario() {
    this.hora = this.usuario.getHora();
    this.fecha = this.usuario.getDìa();
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
              this.route.navigate(['/modal', JSON.stringify(this.dato)]);
            } else {
              this.avisos('Tu ubicación no esta con el cliente, se registra como NO VISITADO, distancia: '
              + info.resp.resp.distancia + ' ' + info.resp.resp.tipo);
              setTimeout(() => this.route.navigate(['/modal', JSON.stringify(this.dato)]), 5050);
            }
          }
        });
      });
    });
  }

  avisos(msg: any) {
    const toast = this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'middle',
      color: 'danger'
    });
    toast.then((to) => to.present());
  }

}
