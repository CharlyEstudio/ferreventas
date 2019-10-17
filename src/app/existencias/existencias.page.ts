import { Component, OnInit } from '@angular/core';

// Plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
    private peticiones: PeticionesService,
    private iab: InAppBrowser
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
            }
          }
        });
      });
    } else {
      this.producto = null;
      this.articulo = 0;
    }
  }

  verInfo() {
    const url = `https://www.truper.com.mx/pdf/diagramas/${this.producto.clave}.pdf`;
    const browser = this.iab.create(url, '_blank');
    browser.show();
  }

}
