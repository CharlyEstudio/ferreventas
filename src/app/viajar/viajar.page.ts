import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit {

  dato: any;

  // Datos del Viaje
  comercio: string;
  lat = 0;
  lng = 0;
  img: string;
  numero: number;
  nombre: string;
  domicilio: string;
  saldo: number;
  ultima: string;
  email: string;

  constructor(
    private router: ActivatedRoute
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
    console.log(this.dato);
  }

  ngOnInit() {
    this.comercio = this.dato.comercio;
    this.lat = this.dato.lat;
    this.lng = this.dato.lng;

    // Info Cliente
    this.img = this.dato.img;
    this.numero = this.dato.numero;
    this.nombre = this.dato.nombre;
    this.domicilio = this.dato.domicilio;
    this.saldo = this.dato.saldo;
    this.ultima = this.dato.ultima;
    this.email = this.dato.email;
  }

  clickMarker() {
    console.log('Mostrando Información');
  }

}
