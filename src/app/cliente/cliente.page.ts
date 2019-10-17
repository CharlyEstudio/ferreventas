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
    private callNumber: CallNumber
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
    this.callNumber.callNumber(dato.tel, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  enviarComentario() {
    this.route.navigate(['/modal', JSON.stringify(this.dato)]);
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
