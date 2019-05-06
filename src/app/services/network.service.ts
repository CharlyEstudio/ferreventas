import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';

export enum ConnectionStatus {
  Online,
  Offline
}

const API_URL_PHP = 'http://177.244.55.122/api';

// Plugins
import { Network } from '@ionic-native/network/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(
    private network: Network,
    private toastController: ToastController,
    private plt: Platform,
    private http: HttpClient,
    private storage: Storage
  ) {
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
      const status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('OffLine Red Movil');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      console.log('OnLine Red Movil');
      this.updateNetworkStatus(ConnectionStatus.Online);
    });
  }

  public updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
    this.mensajes(`Estas ${connection}`, 3000);
    this.storage.get('mensaje-visita').then((resp: any) => {
      if (resp !== null) {
        resp.forEach((element: any) => {
          return this.http.post(`${API_URL_PHP}/visitas.php?opcion=1`, {
            numero: element.num,
            asesor: element.ase,
            accion: element.acc,
            comentario: element.com,
            fecha: element.fec,
            hora: element.hor
          }, {
            headers: {'content-Type': 'application/x-www-form-urlencoded'}
          });
        });
      }
    });
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getNetSatus(): ConnectionStatus {
    return this.status.getValue();
  }

  public mensajes(msg: any, time: number) {
    const toast = this.toastController.create({
      message: msg,
      duration: time,
      position: 'bottom'
    });
    toast.then((to) => to.present());
  }
}
