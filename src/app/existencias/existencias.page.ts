import { Component, OnInit } from '@angular/core';

// Servicios
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.page.html',
  styleUrls: ['./existencias.page.scss'],
})
export class ExistenciasPage implements OnInit {

  producto: any;
  articulo: number;

  constructor(
    private peticiones: PeticionesService
  ) { }

  ngOnInit() {
  }

  obtenerProducto(codigo: string) {
    if (codigo.length === 5) {
      this.peticiones.getExistencias(codigo).then((resp: any) => {
        resp.subscribe((info: any) => {
          if (info.status) {
            const art = info.resp;
            if (art.length > 0) {
              this.articulo = art.length;
              this.producto = art[0];
              console.log(this.producto);
            }
          }
        });
      });
    } else {
      this.producto = null;
      this.articulo = 0;
    }
  }

}
