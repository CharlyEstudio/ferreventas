import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// Servicios
import { WsService } from '../services/ws.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  fecha: number = Date.now();

  porBajar: number;
  porSurtir: number;
  facturado: number;
  cancelado: number;
  totalPed: number;
  totalPedImpo: number;
  diaVis: number;
  pedidosDia: number;
  pedidosDiaDif: number;
  carteraTot: number;
  carteraVen: number;
  carteraDiaSana: number;
  carteraDiaVenc: number;
  cobroDia: number;
  ventaMes: number;
  ventaMesAnt: number;

  constructor(
    private plt: Platform,
    public ws: WsService,
    private usuario: UsuarioService
  ) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.obtenerInfo(true);
    });
  }

  obtenerInfo(refresh: boolean = false, refresher?: any) {
    this.usuario.getLocalData('usuario').then((user: any) => {
      console.log(user.idFerrum);
      this.usuario.porBajar(refresh, user.idFerrum).subscribe((bajar: any) => {
        this.porBajar = bajar[0].cantidad;
      });
      this.usuario.porSurtir(refresh, user.idFerrum).subscribe((surtir: any) => {
        this.porSurtir = surtir[0].cantidad;
      });
      this.usuario.facturado(refresh, user.idFerrum).subscribe((factura: any) => {
        this.facturado = factura[0].cantidad;
      });
      this.usuario.cancelado(refresh, user.idFerrum).subscribe((cancela: any) => {
        this.cancelado = cancela[0].cantidad;
      });
      this.usuario.pedidosTotales(refresh, user.idFerrum).subscribe((pedTot: any) => {
        this.totalPed = pedTot[0].cantidad;
        this.totalPedImpo = pedTot[0].importe;
      });
      this.usuario.diaVisita(refresh, user.idFerrum).subscribe((diavis: any) => {
        this.diaVis = diavis[0].cantidad;
      });
      this.usuario.pedidosDia(refresh, user.idFerrum).subscribe((peddia: any) => {
        this.pedidosDia = peddia.length;
      });
      this.usuario.pedDiaDiferente(refresh, user.idFerrum).subscribe((peddiadif: any) => {
        this.pedidosDiaDif = peddiadif.length;
      });
      this.usuario.carteraTotal(refresh, user.idFerrum).subscribe((carteraTot: any) => {
        this.carteraTot = carteraTot[0].saldo;
      });
      this.usuario.carteraVencida(refresh, user.idFerrum).subscribe((carteraVen: any) => {
        this.carteraVen = carteraVen[0].importe;
      });
      this.usuario.carteraDiaSana(refresh, user.idFerrum).subscribe((carteraDiaSana: any) => {
        this.carteraDiaSana = carteraDiaSana[0].importe;
      });
      this.usuario.carteraDiaVencida(refresh, user.idFerrum).subscribe((carteraDiaVenc: any) => {
        this.carteraDiaVenc = carteraDiaVenc[0].importe;
      });
      this.usuario.cobroDia(refresh, user.idFerrum).subscribe((cobroDia: any) => {
        this.cobroDia = cobroDia[0].importe;
      });
      this.usuario.ventaMensual(refresh, user.idFerrum).subscribe((ventaMes: any) => {
        this.ventaMes = ventaMes[0].subtotal;
      });
      this.usuario.ventaMesAnterior(refresh, user.idFerrum).subscribe((ventaMesAnt: any) => {
        this.ventaMesAnt = ventaMesAnt[0].importe;
      });
    });

    if (refresher) {
      refresher.target.complete();
    }
  }

}
