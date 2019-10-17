import { Component, OnInit } from '@angular/core';

// Plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// Modelos
import { Gps } from '../models/usuario.model';

// Servicios
import { PeticionesService } from '../services/peticiones.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-edocta',
  templateUrl: './edocta.page.html',
  styleUrls: ['./edocta.page.scss'],
})
export class EdoctaPage implements OnInit {

  usuario: Gps;
  file: any;
  msg: any;
  correcto: boolean;

  constructor(
    private iab: InAppBrowser,
    private peticiones: PeticionesService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.gps;
  }

  ngOnInit() {
  }

  obtenerEdoCta(numero: any) {
    if (numero.length === 5) {
      this.peticiones.getEdoCta(this.usuario.nombre, numero, this.usuario.rol).then((resp: any) => {
        resp.subscribe((result: any) => {
          this.correcto = result.status;
          if (result.status) {
            this.file = result.archivo;
            this.msg = result.msg;
          } else {
            this.msg = result.msg;
          }
        });
      });
    }
  }

  verInfo() {
    const url = `https://ferremayoristas.com.mx/api/${this.file}`;
    const browser = this.iab.create(url, '_blank');
    browser.show();
  }

}
