import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// Servicios
import { GeoService } from '../services/geo.service';
import { UsuarioService } from '../services/usuario.service';
import { NetworkService, ConnectionStatus } from '../services/network.service';

const API_STORAGE_KEY = 'localData';
const API_URL_PHP = 'http://177.244.55.122/api';
const API_URL4111 = 'http://177.244.55.122:4111';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit {

  dato: any;

  // Datos del Viaje
  comercio: string;
  lat = 0;
  lng = 0;
  asesor: number;
  img: string;
  clienteid: number;
  numero: number;
  nombre: string;
  domicilio: string;
  limite: number;
  saldo: number;
  disponible: number;
  ultima: string;
  email: string;

  // Datos de Direction
  alternativa = true;
  origin = {
    lat: 0,
    lng: 0
  };

  destiny = {
    lat: 0,
    lng: 0
  };

  constructor(
    private router: ActivatedRoute,
    private toastCtl: ToastController,
    private geo: GeoService,
    private storage: Storage,
    private usuario: UsuarioService,
    private net: NetworkService
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
  }

  ngOnInit() {
    this.comercio = this.dato.comercio;
    this.geo.ubicacionGPS().subscribe((coords: any) => {
      this.lat = coords.coords.latitude;
      this.lng = coords.coords.longitude;
      this.origin.lat = this.lat;
      this.origin.lng = this.lng;
      this.destiny.lat = this.dato.lat;
      this.destiny.lng = this.dato.lng;
    });

    this.asesor = this.dato.asesor;

    // Info Cliente
    this.img = this.dato.img;
    this.clienteid = this.dato.clienteid;
    this.numero = this.dato.numero;
    this.nombre = this.dato.nombre;
    this.domicilio = this.dato.domicilio;
    this.limite = this.dato.limite;
    this.saldo = this.dato.saldo;
    this.disponible = this.dato.limite - this.dato.saldo;
    this.ultima = this.dato.ultima;
    this.email = this.dato.email;
  }

  async agregarMarker(event: any) {
    const msg = 'Nuevas Coordenadas:\n' +
                event.coords.lat +
                '\n' + event.coords.lat
                + '\nal cliente # ' + this.numero + '?';
    const toast = await this.toastCtl.create({
      header: 'Agregar GPS',
      message: msg,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          text: 'Si',
          handler: () => {
            if (this.net.getNetSatus() === ConnectionStatus.Offline) {
              this.usuario.getLocalData('markers').then((marks: any) => {
                let markersAnt = [];
                if (marks !== null) {
                  markersAnt.push(marks);
                  this.storage.remove(`${API_STORAGE_KEY}-markers`);
                }
                const markerNew = {
                  cliente: this.numero,
                  coordenadas: event.coords
                };
                markersAnt.push(markerNew);
                this.usuario.setLocalData('markers', markersAnt);
                const msg = 'Envio Cancelado';
                const toast = this.toastCtl.create({
                  header: 'Se guardo localmente.',
                  message: msg,
                  position: 'bottom',
                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    }
                  ]
                });
                toast.then((to) => to.present());
              });
            } else {
              this.usuario.getLocalData('markers').then((marks: any) => {
                let markersAnt = [];
                if (marks !== null) {
                  markersAnt.push(marks);
                  this.storage.remove(`${API_STORAGE_KEY}-markers`);
                }
                const markerNew = {
                  cliente: this.numero,
                  coordenadas: event.coords
                };
                markersAnt.push(markerNew);
                this.usuario.agregarMarker(this.asesor, markerNew).subscribe((resp: any) => {
                  let msg;
                  if (resp[0].msh === 'ok') {
                    msg = 'GPS Enviado correctamente';
                  } else {
                    msg = 'GPS No Enviado';
                  }
                  const toast = this.toastCtl.create({
                    header: 'Información del Cliente',
                    message: 'GPS Enviado correctamente',
                    position: 'bottom',
                    buttons: [
                      {
                        text: 'Ok',
                        role: 'cancel',
                        handler: () => {
                          console.log('Cancel clicked');
                        }
                      }
                    ]
                  });
                  toast.then((to) => to.present());
                });
              });
            }
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            const msg = 'Envio Cancelado';
            const toast = this.toastCtl.create({
              header: 'Información del Cliente',
              message: msg,
              position: 'bottom',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            toast.then((to) => to.present());
          }
        }
      ]
    });
    toast.present();
  }

  async info() {
    const msg = '# ' + this.numero + ' ' + this.nombre
                + '\nLímite: ' + this.limite + ' Saldo: ' + this.saldo
                + '\nUltima Compra: ' + this.ultima
                + '\nEmail Registrado: \n' + this.email;
    const toast = await this.toastCtl.create({
      header: 'Información del Cliente',
      message: msg,
      position: 'bottom',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
