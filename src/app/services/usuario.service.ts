import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService, ConnectionStatus } from './network.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const API_STORAGE_KEY = 'localData';
const API_URL_PHP = 'http://177.244.55.122/api';
const API_URL4111 = 'http://177.244.55.122:4111';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private net: NetworkService,
    private storage: Storage
  ) { }

  usuario(forceRefresh: boolean, imei: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('usuario'));
    } else {
      return this.http.get(`${API_URL4111}/gps/imei?imei=${imei}`).pipe(
        map((res: any) => {
          this.setLocalData('usuario', res);
          return res;
        })
      );
    }
  }

  clientes(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cliente'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=24&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cliente', res);
          return res;
        })
      );
    }
  }

  porBajar(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('porbajar'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=1&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('porbajar', res);
          return res;
        })
      );
    }
  }

  porSurtir(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('porsurtir'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=2&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('porsurtir', res);
          return res;
        })
      );
    }
  }

  facturado(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('facturado'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=3&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('facturado', res);
          return res;
        })
      );
    }
  }

  cancelado(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cancelado'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=4&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cancelado', res);
          return res;
        })
      );
    }
  }

  pedidosTotales(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('total-pedidos'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=5&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('total-pedidos', res);
          return res;
        })
      );
    }
  }

  diaVisita(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('dia-visita'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=6&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('dia-visita', res);
          return res;
        })
      );
    }
  }

  pedidosDia(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('pedidos-dia'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=12&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('pedidos-dia', res);
          return res;
        })
      );
    }
  }

  pedDiaDiferente(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('pedidos-dia-diferente'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=11&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('pedidos-dia-diferente', res);
          return res;
        })
      );
    }
  }

  carteraTotal(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cartera-total'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=22&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cartera-total', res);
          return res;
        })
      );
    }
  }

  carteraVencida(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cartera-vencida'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=8&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cartera-vencida', res);
          return res;
        })
      );
    }
  }

  carteraDiaSana(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cartera-dia-sana'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=23&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cartera-dia-sana', res);
          return res;
        })
      );
    }
  }

  carteraDiaVencida(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cartera-dia-vencida'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=9&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cartera-dia-vencida', res);
          return res;
        })
      );
    }
  }

  cobroDia(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cobro-dia'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=10&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('cobro-dia', res);
          return res;
        })
      );
    }
  }

  ventaMensual(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('venta-mes'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=7&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('venta-mes', res);
          return res;
        })
      );
    }
  }

  ventaMesAnterior(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('venta-mes-anterior'));
    } else {
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=13&perid=${idFerrum}`).pipe(
        map((res: any) => {
          this.setLocalData('venta-mes-anterior', res);
          return res;
        })
      );
    }
  }

  public agregarMarker(vendedor: any, data: any): any {
    return this.http.post(`${API_URL_PHP}/markers.php?opcion=1`,
      { asesor: vendedor, datos: data},
      {headers: {'content-Type': 'application/x-www-form-urlencoded'}
    });
  }

  getLocalData(key: any) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }

  setLocalData(key: any, data: any) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  getDìa() {
    const h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if ((h.getMonth() + 1) < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = h.getMonth() + 1;
    }

    const anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-' + dia;
    return fecha;
  }

  getHora() {
    const h = new Date();

    let sec;

    if (h.getSeconds() < 10) {
      sec = '0' + h.getSeconds();
    } else {
      sec = h.getSeconds();
    }

    let min;

    if (h.getMinutes() < 10) {
      min = '0' + h.getMinutes();
    } else {
      min = h.getMinutes();
    }

    const hor = h.getHours();

    const hora = hor + ':' + min + ':' + sec;
    return hora;
  }

  enviarComentario(num: any, ase: any, acc: any, com: any, fec: any, hor: any) {
    const mensaje = {
      numero: num,
      asesor: ase,
      accion: acc,
      comentario: com,
      fecha: fec,
      hora: hor
    };

    if (this.net.getNetSatus() === ConnectionStatus.Offline) {
      this.getLocalData('mensaje-visita').then((resp: any) => {
        console.log(resp);
        const array = [];
        if (resp === null) {
          array.push(mensaje);
          this.setLocalData('mensaje-visita', array);
        } else {
          array.push(resp);
          array.push(mensaje);
          this.storage.remove('mensaje-visita');
          this.setLocalData('mensaje-visita', array);
        }
      });
    } else {
      this.getLocalData('mensaje-visita').then((resp: any) => {
        if (resp === null) {
          return this.http.post(`${API_URL_PHP}/visitas.php?opcion=1`, {
            numero: num,
            asesor: ase,
            accion: acc,
            comentario: com,
            fecha: fec,
            hora: hor
          }, {
            headers: {'content-Type': 'application/x-www-form-urlencoded'}
          });
        } else {
          this.storage.remove('mensaje-visita');
          resp.forEach((element: any) => {
            return this.http.post(`${API_URL_PHP}/visitas.php?opcion=1`, {
              numero: element.num,
              asesor: element.ase,
              accion: element.acc,
              comentario: element.com,
              fecha: element.fec,
              hora: element.hor
            }, {
              headers: {'content-Type': 'application/x-www-form-urlencoded'}
            });
          });
        }
      });
    }
  }

  enviarPago(data: any) {
    const url = 'http://177.244.55.122/api/visitas.php?opcion=2';
    return this.http.post(url, {
      datos: data
    }, {
      headers: {'content-Type': 'application/x-www-form-urlencoded'}
    });
  }
}
