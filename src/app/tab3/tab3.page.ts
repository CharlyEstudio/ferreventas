import { Component } from '@angular/core';
import { ToastController, Platform, MenuController } from '@ionic/angular';

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// servicios
import { WsService } from '../services/ws.service';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  total = 0;
  tipo: string;
  imporFinal = 0;
  porcenFinal = 0;
  pagoMes = 0;
  impor = 0;
  tipoPago: string;
  tipoPayment: string;
  // intDebito = 0.0145;
  // intCredito = 0.0125;
  intDebito = 0.0125;
  intCredito = 0.0145;
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
    public menuCtrl: MenuController,
    private plt: Platform,
    private tstCtl: ToastController,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private usuario: UsuarioService,
    public ws: WsService
  ) {}

  toggleMenu() {
    this.menuCtrl.toggle(); // Add this method to your button click function
  }

  importe(valor: any) {
    if (valor === '') {
      if (!this.disabled) {
        this.mensaje('SIN IMPORTE', 'Debe de ingresar un importe para calcular.');
      }
      this.total = 0;
      this.imporFinal = 0;
      this.radioDis = true;
    } else {
      this.impor = Number(valor);
      this.radioDis = false;
      this.total = this.impor;
      if (this.tipo === 'debito') {
        this.tipoTarjeta(this.tipo);
      } else {
        this.promoMes(this.promo);
      }
    }
  }

  tipoTarjeta(valor: any) {
    this.tipo = valor;
    if (valor === 'debito') {
      this.disabled = true;
      this.promo = '0';
      this.pagoMes = 0;
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

  tipoAbono(valor: any) {
    this.tipoPayment = valor;
  }

  promoMes(valor: any) {
    this.desgloce = [];
    this.porcenFinal = 0;
    this.pagoMes = 0;
    this.promo = valor;
    let iva;
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
    this.pagoMes = this.imporFinal / Number(valor);
    for (let i = 1; i <= Number(valor); i++) {
      const dato = {
        pago: `Pago ${i}`,
        importe: this.pagoMes
      };
      this.desgloce.push(dato);
    }
  }

  enviarCobro() {
    const fechaActual = this.usuario.getDìa();
    const horaActual = this.usuario.getHora();
    if (this.plt.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        if (!barcodeData.cancelled && barcodeData.text !== null) {
          /*console.log('IMEI: ' + this.imei.getImeiN());
          console.log('Fecha: ' + fechaActual);
          console.log('Hora: ' + horaActual);
          console.log('Comisión Final: ' + this.porcenFinal);
          console.log('Importe Inicial: ' + this.total);
          console.log('Importe Final: ' + this.imporFinal);
          console.log('Tipo de Tarjeta: ' + this.tipo);
          console.log('Tipo de Pago: ' + this.tipoPayment);
          console.log('Promoción: ' + this.promo);
          console.log('Pago Mensual: ' + this.pagoMes);
          console.log('Texto Code: ' + barcodeData.text);
          console.log('Formato Code: ' + barcodeData.format);*/
          this.usuario.getLocalData('usuario').then((user: any) => {
            const enviar = {
              perid: user.idFerrum,
              fecha: fechaActual,
              hora: horaActual,
              comision: this.porcenFinal,
              importeInicial: this.total,
              importeFinal: this.imporFinal,
              tarjeta: this.tipo,
              pago: this.tipoPayment,
              promocion: this.promo,
              pagoMensual: this.pagoMes,
              factura: barcodeData.text
            };
            this.usuario.enviarPago(enviar).then((resp: any) => {
              console.log(resp);
              resp.subscribe((enviado: any) => {
                console.log(enviado);
                if (enviado.status) {
                }
              });
            }, err => console.log(err.message));
            // this.usuario.enviarPago(enviar).subscribe((resp: any) => {
            //   if (resp !== null) {
            //     this.mensaje('Envio Correcto', 'Se ha enviado correctamente el pago.');
            //     setTimeout(() => {
            //       this.router.navigate(['/']);
            //     }, 2000);
            //   } else {
            //     this.mensaje('Error de Envio', 'No se envio correctamente el pago, favor de reportar.');
            //   }
            // });
          });
        } else {
          this.mensaje('Cancelado', 'Se cancelo el escanneo. Favor de volver a intentar.');
        }
       }).catch(err => {
           console.log('Error', err);
           const msg = 'Error: ' + err;
           this.mensaje('Error en el BarCode', msg);
       });
    } else {
      /*console.log('Fecha: ' + fechaActual);
      console.log('Hora: ' + horaActual);
      console.log('Comisión Final: ' + this.porcenFinal);
      console.log('Importe Inicial: ' + this.total);
      console.log('Importe Final: ' + this.imporFinal);
      console.log('Tipo de Tarjeta: ' + this.tipo);
      console.log('Tipo de Pago: ' + this.tipoPayment);
      console.log('Promoción: ' + this.promo);
      console.log('Pago Mensual: ' + this.pagoMes);*/
      this.usuario.getLocalData('usuario').then((user: any) => {
        const enviar = {
          perid: user.idFerrum,
          fecha: fechaActual,
          hora: horaActual,
          comision: this.porcenFinal,
          importeInicial: this.total,
          importeFinal: this.imporFinal,
          tarjeta: this.tipo,
          pago: this.tipoPayment,
          promocion: this.promo,
          pagoMensual: this.pagoMes,
          factura: '200584'
        };
        this.usuario.enviarPago(enviar).then((resp: any) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.mensaje('Pago Correcto', 'Pago enviado a guardar');
              this.router.navigate(['/']);
            } else {
              this.mensaje('Pago Incorrecto', 'Pago sin enviar');
            }
          });
        }, err => console.log(err.message));
        // this.usuario.enviarPago(enviar).subscribe((resp: any) => {
        //   if (resp !== null) {
        //     this.mensaje('Envio Correcto', 'Se ha enviado correctamente el pago.');
        //     setTimeout(() => {
        //       this.router.navigate(['/']);
        //     }, 2000);
        //   } else {
        //     this.mensaje('Error de Envio', 'No se envio correctamente el pago, favor de reportar.');
        //   }
        // });
      });
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
