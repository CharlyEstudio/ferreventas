import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController } from '@ionic/angular';

// servicios
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  total = 0;
  imporFinal = 0;
  porcenFinal = 0;
  impor = 0;
  tipoPago: string;
  intDebito = 0.0145;
  intCredito = 0.0125;
  intCredito3 = 0.03;
  intCredito6 = 0.058;
  intCredito9 = 0.087;
  intCredito12 = 0.117;
  intCredito18 = 0.15;
  promo: string;
  impuesto = 0.16;
  disabled = true;
  radioDis = true;
  desgloce: any[] = [];

  constructor(
    private tstCtl: ToastController,
    public ws: WsService
  ) {}

  importe(valor: any) {
    if (valor === '') {
      if (!this.disabled) {
        this.mensaje('SIN IMPORTE', 'Debe de ingresar un importe para calcular.');
      }
      this.total = 0;
      this.radioDis = true;
    } else {
      this.impor = Number(valor);
      this.radioDis = false;
      this.total = this.impor;
      this.imporFinal = this.total;
    }
  }

  tipoTarjeta(valor: any) {
    if (valor === 'debito') {
      this.disabled = true;
      this.desgloce = [];
      this.porcenFinal = this.intDebito;
      const iva = (this.total * this.intDebito) * this.impuesto;
      this.imporFinal = this.total + (this.total * this.intDebito) + iva;
    } else {
      this.disabled = false;
      if (this.promo !== '') {
        this.promoMes(this.promo);
      }
    }
    this.tipoPago = valor;
  }

  promoMes(valor: any) {
    this.desgloce = [];
    this.porcenFinal = 0;
    this.promo = valor;
    let iva
    switch (valor) {
      case '3':
        iva = (this.total * this.intCredito3) * this.impuesto;
        this.imporFinal = this.total + (this.total * this.intCredito3) + iva;
        this.porcenFinal = this.intCredito3;
        break;
      case '6':
        iva = (this.total * this.intCredito6) * this.impuesto;
        this.imporFinal = this.total + (this.total * this.intCredito6) + iva;
        this.porcenFinal = this.intCredito6;
        break;
      case '9':
        iva = (this.total * this.intCredito9) * this.impuesto;
        this.imporFinal = this.total + (this.total * this.intCredito9) + iva;
        this.porcenFinal = this.intCredito9;
        break;
      case '12':
        iva = (this.total * this.intCredito12) * this.impuesto;
        this.imporFinal = this.total + (this.total * this.intCredito12) + iva;
        this.porcenFinal = this.intCredito12;
        break;
      case '18':
        iva = (this.total * this.intCredito18) * this.impuesto;
        this.imporFinal = this.total + (this.total * this.intCredito18) + iva;
        this.porcenFinal = this.intCredito18;
        break;
      default:
        iva = (this.total * this.intCredito) * this.impuesto;
        this.imporFinal = this.total + (this.total * this.intCredito) + iva;
        this.porcenFinal = this.intCredito;
    }
    const pagoMes = this.imporFinal / Number(valor);
    for (let i = 1; i <= Number(valor); i++) {
      const dato = {
        pago: `Pago ${i}`,
        importe: pagoMes
      };
      this.desgloce.push(dato);
    }
  }

  mensaje(titulo: any, msg: any) {
    const toast = this.tstCtl.create({
      header: titulo,
      message: msg,
      position: 'middle',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    toast.then((to) => { to.present(); });
  }
}
