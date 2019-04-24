import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  usuario(imei: any) {
    const url = 'http://177.244.55.122:4111/gps/imei?imei=' + imei;
    return this.http.get(url);
  }
}
