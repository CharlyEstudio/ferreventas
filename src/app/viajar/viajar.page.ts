import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// Plugins
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

// Servicios
import { GeoService } from '../services/geo.service';
import { UsuarioService } from '../services/usuario.service';
import { NetworkService, ConnectionStatus } from '../services/network.service';
import { Subscription, Observable, Subscriber } from 'rxjs';

const API_STORAGE_KEY = 'localData';
const API_URL_PHP = 'http://177.244.55.122/api';
const API_URL4111 = 'http://177.244.55.122:4111';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit, OnDestroy {

  dato: any;

  // Marcadores
  markerDraggable = true;

  // Observable del Viaje
  observar: Subscription;

  // Datos del Viaje
  comercio: string;
  lat = 0;
  lng = 0;
  latMarker = 0;
  lngMarker = 0;
  latEscucha = 0;
  lngEscucha = 0;
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
  zoom = 9.7;
  alternativa = true;
  origin = {
    lat: 0,
    lng: 0
  };

  destiny = {
    lat: 0,
    lng: 0
  };

  public renderOptions = {
    suppressMarkers: true,
  };

  public markerOptions = {
      origin: {
          label: 'Asesor'
      },
      destination: {
          label: 'Cliente'
      },
  };

  constructor(
    private router: ActivatedRoute,
    private toastCtl: ToastController,
    private geo: GeoService,
    private storage: Storage,
    private usuario: UsuarioService,
    private net: NetworkService,
    private tts: TextToSpeech
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));

    this.observar = this.regresar().subscribe(
      escuchando => {
        this.latEscucha = escuchando.coords.latitude;
        this.lngEscucha = escuchando.coords.longitude;

        // // Ruta
        this.origin.lat = escuchando.coords.latitude;
        this.origin.lng = escuchando.coords.longitude;
        this.lat = escuchando.coords.latitude;
        this.lng = escuchando.coords.longitude;
      },
      error => this.mensaje(error),
      () => console.log('Salimos')
    );

    // Ubicación de Escucha
    // this.geo.ubicacionGPS().subscribe((resp: any) => {
    //   this.latEscucha = resp.coords.latitude;
    //   this.lngEscucha = resp.coords.longitude;

    //   // Ruta
    //   this.origin.lat = resp.coords.latitude;
    //   this.origin.lng = resp.coords.longitude;
    //   this.lat = resp.coords.latitude;
    //   this.lng = resp.coords.longitude;
    // });
  }

  regresar(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      // Ubicación de Escucha
      this.geo.ubicacionGPS().subscribe((resp: any) => {
        observer.next(resp);
      });
    });
  }

  ngOnInit() {
    this.comercio = this.dato.comercio;
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

    // Ruta
    this.destiny.lat = this.dato.lat;
    this.destiny.lng = this.dato.lng;
  }

  ngOnDestroy() {
    this.observar.unsubscribe();
  }

  iniciar() {
    this.zoom = 19;
    this.lat = this.origin.lat;
    this.lng = this.origin.lng;
  }

  setPanel() {
    return document.querySelector('#myPanel');
  }

  // Para ver la respuesta, aquí se ven los pasos a seguir
  // Metodo en AGM_DIRECTION: (onResponse)="getStatus($event)"
  getStatus(event: any) {
    // console.log(event);
  }

  hablar() {
    this.tts.speak('Hello World')
      .then(() => console.log('success'))
      .catch((reason: any) => console.log(reason));
  }

  async agregarMarker(event: any) {
    this.latMarker = event.coords.lat;
    this.lngMarker = event.coords.lng;
    const msg = 'Nuevas Coordenadas:\n' +
                event.coords.lat +
                '\n' + event.coords.lat
                + '\nal cliente # ' + this.numero + '?';
    const toast = await this.toastCtl.create({
      header: 'Agregar GPS',
      message: msg,
      position: 'bottom',
      color: 'danger',
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
            this.latMarker = 0;
            this.lngMarker = 0;
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

  mensaje(msg: any) {
    const toast = this.toastCtl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
    toast.then((to) => to.present());
  }

}
