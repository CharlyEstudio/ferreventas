import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

export enum ConnectionStatus {
  Online,
  Offline
}

const API_STORAGE_KEY = 'localData';

// Plugins
import { Network } from '@ionic-native/network/ngx';

const API_URL_PHP = 'https://ferremayoristas.com.mx/api';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(
    private network: Network,
    private toastController: ToastController,
    private plt: Platform,
    private storage: Storage,
    private http: HttpClient,
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
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      this.updateNetworkStatus(ConnectionStatus.Online);
    });

  }

  public updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
    if (connection === 'Online') {
      // this.mensajes('Obtener todos los mensajes guardados', 3000);
      this.getLocalData('mensaje-visita').then((mensajes: any) => {
        console.log(mensajes.length);
        this.http.post(`${API_URL_PHP}/visitas.php?opcion=4`, {
          data: mensajes
        }, {
          headers: {'content-Type': 'application/x-www-form-urlencoded'}
        });
        // for (const e of mensajes) {
        //   console.log(e.fecha);
        //   console.log(e.hora);
        //   console.log(e.numero);
        //   console.log(e.asesor);
        //   console.log(e.accion);
        //   console.log(e.comentario);
        //   this.http.post(`${API_URL_PHP}/visitas.php?opcion=1`, {
        //     numero: e.numero,
        //     asesor: e.asesor,
        //     accion: e.accion,
        //     comentario: e.comentario,
        //     fecha: e.fecha,
        //     hora: e.hora
        //   }, {
        //     headers: {'content-Type': 'application/x-www-form-urlencoded'}
        //   });
        // }
      });
    } else {
      this.mensajes(`Estas ${connection}`, 3000);
    }
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

  getLocalData(key: any) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

  setLocalData(key: any, data: any) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
}
