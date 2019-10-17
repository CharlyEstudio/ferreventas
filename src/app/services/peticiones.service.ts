import { Injectable } from '@angular/core';

// Srevicios
import { WsService } from './ws.service';

const API_URL_PHP = 'https://ferremayoristas.com.mx/api';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(
    private ws: WsService
  ) { }

  getExistencias(codigo: any) {
    return new Promise((resolve, reject) => {
      this.ws.acciones('movil-existencias', codigo, (resp: any) => {
        resolve(resp);
      });
    });
  }

  getEdoCta(asesor: any, numero: any, rol: any) {
    return new Promise((resolve, reject) => {
      this.ws.acciones('movil-edocta', {asesor, numero, rol}, (resp: any) => {
        resolve(resp);
      });
    });
  }
}
