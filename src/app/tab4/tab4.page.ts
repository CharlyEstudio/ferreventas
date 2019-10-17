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
      let id;
      if (this.plt.is('cordova')) {
        id = user.idFerrum;
      } else {
        id = 6;
      }
      this.usuario.porBajar(refresh, id).then((bajar: any) => {
        bajar.subscribe((pb: any) => {
          if (pb.status) {
            this.porBajar = pb.porbajar.cantidad;
          }
        });
        // this.porBajar = bajar[0].cantidad;
      }, err => console.log(err.message));
      this.usuario.porSurtir(refresh, id).then((surtir: any) => {
        surtir.subscribe((ps: any) => {
          if (ps.status) {
            this.porSurtir = ps.porsurtir.cantidad;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      this.usuario.facturado(refresh, id).then((surtir: any) => {
        surtir.subscribe((pf: any) => {
          if (pf.status) {
            this.facturado = pf.facturado.cantidad;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.facturado(refresh, id).subscribe((factura: any) => {
      //   this.facturado = factura[0].cantidad;
      // });
      this.usuario.cancelado(refresh, id).then((surtir: any) => {
        surtir.subscribe((pc: any) => {
          if (pc.status) {
            this.cancelado = pc.cancelado.cantidad;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.cancelado(refresh, id).subscribe((cancela: any) => {
      //   this.cancelado = cancela[0].cantidad;
      // });
      this.usuario.pedidosTotales(refresh, id).then((surtir: any) => {
        surtir.subscribe((pt: any) => {
          if (pt.status) {
            this.totalPed = pt.tpedidos.total_cant;
            this.totalPedImpo = pt.tpedidos.total_impo;
            this.diaVis = pt.tpedidos.clientes_dia;
            this.pedidosDia = pt.tpedidos.clientes_con_pedido_dia;
            this.pedidosDiaDif = pt.tpedidos.clientes_con_pedido_nodia;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.pedidosTotales(refresh, id).subscribe((pedTot: any) => {
      //   this.totalPed = pedTot[0].cantidad;
      //   this.totalPedImpo = pedTot[0].importe;
      // });
      // this.usuario.diaVisita(refresh, id).subscribe((diavis: any) => {
      //   this.diaVis = diavis[0].cantidad;
      // });
      // this.usuario.pedidosDia(refresh, id).subscribe((peddia: any) => {
      //   this.pedidosDia = peddia.length;
      // });
      // this.usuario.pedDiaDiferente(refresh, id).subscribe((peddiadif: any) => {
      //   this.pedidosDiaDif = peddiadif.length;
      // });
      this.usuario.carteraTotal(refresh, id).then((surtir: any) => {
        surtir.subscribe((ct: any) => {
          if (ct.status) {
            this.carteraTot = ct.carteratotal.saldo;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.carteraTotal(refresh, id).subscribe((carteraTot: any) => {
      //   this.carteraTot = carteraTot[0].saldo;
      // });
      this.usuario.carteraVencida(refresh, id).then((surtir: any) => {
        surtir.subscribe((cv: any) => {
          if (cv.status) {
            this.carteraVen = cv.carteravencida.importe;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.carteraVencida(refresh, id).subscribe((carteraVen: any) => {
      //   this.carteraVen = carteraVen[0].importe;
      // });
      this.usuario.carteraDiaSana(refresh, id).then((surtir: any) => {
        surtir.subscribe((cds: any) => {
          if (cds.status) {
            this.carteraDiaSana = cds.carteradiasana.importe;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.carteraDiaSana(refresh, id).subscribe((carteraDiaSana: any) => {
      //   this.carteraDiaSana = carteraDiaSana[0].importe;
      // });
      this.usuario.carteraDiaVencida(refresh, id).then((surtir: any) => {
        surtir.subscribe((cdv: any) => {
          if (cdv.status) {
            this.carteraDiaVenc = cdv.carteradiavenc.importe;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.carteraDiaVencida(refresh, id).subscribe((carteraDiaVenc: any) => {
      //   this.carteraDiaVenc = carteraDiaVenc[0].importe;
      // });
      this.usuario.cobroDia(refresh, id).then((surtir: any) => {
        surtir.subscribe((cd: any) => {
          if (cd.status) {
            this.cobroDia = cd.cobrodia.importe;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.cobroDia(refresh, id).subscribe((cobroDia: any) => {
      //   this.cobroDia = cobroDia[0].importe;
      // });
      this.usuario.ventaMensual(refresh, id).then((surtir: any) => {
        surtir.subscribe((vm: any) => {
          if (vm.status) {
            this.ventaMes = vm.vtames.subtotal;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.ventaMensual(refresh, id).subscribe((ventaMes: any) => {
      //   this.ventaMes = ventaMes[0].subtotal;
      // });
      this.usuario.ventaMesAnterior(refresh, id).then((surtir: any) => {
        surtir.subscribe((vma: any) => {
          if (vma.status) {
            this.ventaMesAnt = vma.vtamesant.subtotal;
          }
        });
        // this.porSurtir = surtir[0].cantidad;
      }, err => console.log(err.message));
      // this.usuario.ventaMesAnterior(refresh, id).subscribe((ventaMesAnt: any) => {
      //   this.ventaMesAnt = ventaMesAnt[0].importe;
      // });
    });

    if (refresher) {
      refresher.target.complete();
    }
  }

}
