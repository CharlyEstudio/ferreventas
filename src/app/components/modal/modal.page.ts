import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { UsuarioService } from '../../services/usuario.service';
import { ToastController } from '@ionic/angular';

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
    private usuario: UsuarioService
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
  }

  ngOnInit() {
  }

  accion(accion: any) {
    this.tipo = accion;

  }

  enviar(texto: any) {
    this.fecha = this.usuario.getDìa();
    this.hora = this.usuario.getHora();
    this.confirmar(texto);
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
            this.usuario.enviarComentario(this.dato.numero, this.dato.perid, this.tipo, msg, this.fecha, this.hora)
            .subscribe((resp: any) => {
              if (resp !== null) {
                this.avisos('Se realizo el envio.');
                setTimeout(() => {
                  this.route.navigate(['/cliente', JSON.stringify(this.dato)]);
                }, 2000);
              } else {
                this.avisos('Error al enviar.');
              }
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
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.then((to) => to.present());
  }

}
