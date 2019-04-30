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

  getDìa() {
    const h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if ((h.getMonth() + 1) < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = h.getMonth() + 1;
    }

    const anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-' + dia;
    return fecha;
  }

  getHora() {
    const h = new Date();

    let sec;

    if (h.getSeconds() < 10) {
      sec = '0' + h.getSeconds();
    } else {
      sec = h.getSeconds();
    }

    let min;

    if (h.getMinutes() < 10) {
      min = '0' + h.getMinutes();
    } else {
      min = h.getMinutes();
    }

    const hor = h.getHours();

    const hora = hor + ':' + min + ':' + sec;
    return hora;
  }

  enviarComentario(num: any, ase: any, acc: any, com: any, fec: any, hor: any) {
    const url = 'http://177.244.55.122/api/visitas.php?opcion=1';
    return this.http.post(url, {
      numero: num,
      asesor: ase,
      accion: acc,
      comentario: com,
      fecha: fec,
      hora: hor
    }, {
      headers: {'content-Type': 'application/x-www-form-urlencoded'}
    });
  }

  enviarPago(data: any) {
    const url = 'http://177.244.55.122/api/visitas.php?opcion=2';
    return this.http.post(url, {
      datos: data
    }, {
      headers: {'content-Type': 'application/x-www-form-urlencoded'}
    });
  }
}
