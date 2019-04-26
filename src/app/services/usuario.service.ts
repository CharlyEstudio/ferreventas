import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService, ConnectionStatus } from './network.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const API_STORAGE_KEY = 'localData';
const API_URL_PHP = 'http://177.244.55.122/api';
const API_URL4111 = 'http://177.244.55.122:4111';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private net: NetworkService,
    private storage: Storage
  ) { }

  usuario(forceRefresh: boolean, imei: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('usuario'));
    } else {
      return this.http.get(`${API_URL4111}/gps/imei?imei=${imei}`).pipe(
        map((res: any) => {
          this.setLocalData('usuario', res);
          return res;
        })
      );
    }
  }

  clientes(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cliente'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=24&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cliente', res);
          return res;
        })
      );
    }
  }

  public agregarMarker(vendedor: any, data: any): any {
    return this.http.post(`${API_URL_PHP}/markers.php?opcion=1`,
      { asesor: vendedor, datos: data},
      {headers: {'content-Type': 'application/x-www-form-urlencoded'}
    });
  }

  getLocalData(key: any) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

  setLocalData(key: any, data: any) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
}
