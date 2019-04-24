import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient
  ) { }

  clientes(idFerrum: any) {
    const url = 'http://177.244.55.122/api/asesores.php?opcion=24&perid=' + idFerrum;

    return this.http.get(url);
  }
}
