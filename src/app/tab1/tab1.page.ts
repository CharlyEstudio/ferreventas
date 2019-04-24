import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { ClientesService } from '../services/clientes.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // Datos del Usurio
  user: any;
  idFerrum: number;
  imei: number;

  // Mensaje del día
  current: any;
  message: any;

  // Clientes del día
  client: any[] = [];
  msg: any;

  constructor(
    private router: Router,
    private clientes: ClientesService,
    private usuario: UsuarioService
  ) {
    // this.imei = 359270078018344;
    this.imei = 123456;
    this.usuario.usuario(this.imei).subscribe((use: any) => {
      this.user = use;
      this.idFerrum = use.idFerrum;
      this.clientes.clientes(this.idFerrum).subscribe((cli: any) => {
        if (cli.length !== 0) {
          this.client = cli;
          this.msg = 'ACTIVO';
        } else {
          this.msg = 'Sin Clientes';
        }
      });
    });
    this.current = 'Charly Ramírez';
    this.message = 'Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsumLorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum Lorem lipsum';
  }

  irA(cli: any) {
    this.router.navigate(['/cliente', JSON.stringify(cli)]);
  }

}
