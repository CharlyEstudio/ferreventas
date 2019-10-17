import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkService, ConnectionStatus } from './network.service';
import { from, Subscriber, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { HTTP } from '@ionic-native/http/ngx';

// Modelos
import { Gps } from '../models/usuario.model';

// Servicios
import { WsService } from './ws.service';

const API_STORAGE_KEY = 'localData';
const API_URL_PHP = 'https://ferremayoristas.com.mx/api';
const API_URL4111 = 'https://ferremayoristas.com.mx:4111';
const API_URL3001 = 'https://ferremayoristas.com.mx:3001';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  gps: Gps;

  cantidadStorage: any;

  constructor(
    private http: HttpClient,
    private httpIonic: HTTP,
    private net: NetworkService,
    private storage: Storage,
    private ws: WsService
  ) {
    this.getLocalData('mensaje-visita').then((info: any) => {
      if (info !== null) {
        localStorage.removeItem('mensaje-visita');
        localStorage.setItem('mensaje-visita', JSON.parse(info));
      }
    });
    if (localStorage.getItem('usuario')) {
      this.gps = JSON.parse(localStorage.getItem('usuario'));
    }
    this.getLocalData('usuario').then((info: any) => {
      if (info !== null) {
        this.gps = info;
      }
    });
  }

  usuario(forceRefresh: boolean, imei: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('usuario'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('usuario'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('login-usuario', {imei}, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.gps = info.usuario;
              localStorage.setItem('usuario', JSON.stringify(info.usuario));
              this.setLocalData('usuario', info.usuario);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL3001}/gps/app/imei?imei=${imei}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.gps = res.respuesta;
      //     this.setLocalData('usuario', res);
      //     return res;
      //   })
      // );
    }
  }

  clientes(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('cliente'));
    } else {
      // Esta funcion ya no se necesita, ya que pido todo en el socket, solo ver que lo almacene en localData

      // Solicitar por HTTP
      const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(`${API_URL_PHP}/asesores.php?opcion=24&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
        map((res: any) => {
          this.setLocalData('cliente', res);
          return res;
        })
      );
    }
  }

  porBajar(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('porbajar'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('porbajar'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-por-bajar', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('porbajar', info.porbajar);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=1&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('porbajar', res);
      //     return res;
      //   })
      // );
    }
  }

  porSurtir(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('porsurtir'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('porsurtir'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-por-surtir', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('porsurtir', info.porsurtir);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=2&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('porsurtir', res);
      //     return res;
      //   })
      // );
    }
  }

  facturado(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('facturado'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('facturado'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-facturado', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('facturado', info.facturado);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=3&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('facturado', res);
      //     return res;
      //   })
      // );
    }
  }

  cancelado(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('cancelado'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('cancelado'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-cancelado', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('cancelado', info.cancelado);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=4&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('cancelado', res);
      //     return res;
      //   })
      // );
    }
  }

  pedidosTotales(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('total-pedidos'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('total-pedidos'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-total-pedidos', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('cancelado', info.tpedidos);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=5&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('total-pedidos', res);
      //     return res;
      //   })
      // );
    }
  }

  // diaVisita(forceRefresh: boolean, idFerrum: any) {
  //   if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
  //     return from(this.getLocalData('dia-visita'));
  //   } else {
  //     // Solicitar por Socket

  //     // Solicitar por HTTP
  //     const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //     return this.http.get(`${API_URL_PHP}/asesores.php?opcion=6&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
  //       map((res: any) => {
  //         this.setLocalData('dia-visita', res);
  //         return res;
  //       })
  //     );
  //   }
  // }

  // pedidosDia(forceRefresh: boolean, idFerrum: any) {
  //   if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
  //     return from(this.getLocalData('pedidos-dia'));
  //   } else {
  //     // Solicitar por Socket

  //     // Solicitar por HTTP
  //     const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //     return this.http.get(`${API_URL_PHP}/asesores.php?opcion=12&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
  //       map((res: any) => {
  //         this.setLocalData('pedidos-dia', res);
  //         return res;
  //       })
  //     );
  //   }
  // }

  // pedDiaDiferente(forceRefresh: boolean, idFerrum: any) {
  //   if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
  //     return from(this.getLocalData('pedidos-dia-diferente'));
  //   } else {
  //     // Solicitar por Socket

  //     // Solicitar por HTTP
  //     const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //     return this.http.get(`${API_URL_PHP}/asesores.php?opcion=11&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
  //       map((res: any) => {
  //         this.setLocalData('pedidos-dia-diferente', res);
  //         return res;
  //       })
  //     );
  //   }
  // }

  carteraTotal(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('cartera-total'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('cartera-total'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-cartera-total', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('cartera-total', info.carteratotal);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=22&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('cartera-total', res);
      //     return res;
      //   })
      // );
    }
  }

  carteraVencida(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('cartera-vencida'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('cartera-vencida'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-cartera-vencida', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('cartera-vencida', info.carteravencida);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=8&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('cartera-vencida', res);
      //     return res;
      //   })
      // );
    }
  }

  carteraDiaSana(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('cartera-dia-sana'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('cartera-dia-sana'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-cartera-diasana', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('cartera-dia-sana', info.carteradiasana);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=23&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('cartera-dia-sana', res);
      //     return res;
      //   })
      // );
    }
  }

  carteraDiaVencida(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('cartera-dia-vencida'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('cartera-dia-vencida'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-cartera-diavenc', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('cartera-dia-vencida', info.carteradiavenc);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=9&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('cartera-dia-vencida', res);
      //     return res;
      //   })
      // );
    }
  }

  cobroDia(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('cobro-dia'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('cobro-dia'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-cobro-dia', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('cobro-dia', info.cobrodia);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=10&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('cobro-dia', res);
      //     return res;
      //   })
      // );
    }
  }

  ventaMensual(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('venta-mes'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('venta-mes'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-venta-mes', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('venta-mes', info.vtames);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=7&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('venta-mes', res);
      //     return res;
      //   })
      // );
    }
  }

  ventaMesAnterior(forceRefresh: boolean, idFerrum: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline || !forceRefresh) {
      // return from(this.getLocalData('venta-mes-anterior'));
      return new Promise((resolve, reject) => {
        resolve(this.getLocalData('venta-mes-anterior'));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('movil-venta-mes-anterior', this.gps.idFerrum, (resp) => {
          resp.subscribe((info: any) => {
            if (info.status) {
              this.setLocalData('venta-mes-anterior', info.vtamesant);
            }
          });
          resolve(resp);
        });
      });

      // Solicitar por HTTP
      // const h = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // return this.http.get(`${API_URL_PHP}/asesores.php?opcion=13&perid=${this.gps.idFerrum}`, {headers: h}).pipe(
      //   map((res: any) => {
      //     this.setLocalData('venta-mes-anterior', res);
      //     return res;
      //   })
      // );
    }
  }

  enviarComentario(mensaje: any) {
    if (this.net.getNetSatus() === ConnectionStatus.Offline) {
      let array = [];
      if (localStorage.getItem('mensaje-visita')) {
        array = JSON.parse(localStorage.getItem('mensaje-visita'));
        array.push(mensaje);
      } else {
        array.push(mensaje);
      }

      localStorage.removeItem('mensaje-visita');
      localStorage.setItem('mensaje-visita', JSON.stringify(array));
      this.setLocalData('mensaje-visita', array);
      // return from(JSON.parse(localStorage.getItem('mensaje-visita')));
      return new Promise((resolve, reject) => {
        resolve(JSON.parse(localStorage.getItem('mensaje-visita')));
      });
    } else {
      // Solicitar por Socket
      return new Promise((resolve, reject) => {
        this.ws.acciones('comentario-asesor', mensaje, (resp) => {
          resolve(resp);
        });
      });
      // let array = [];
      // array.push(mensaje);
      // return from(array);

      // Solicitar por HTTP
      // return this.http.post(`${API_URL_PHP}/visitas.php?opcion=1`, {
      //   numero: mensaje.numero,
      //   asesor: mensaje.asesor,
      //   accion: mensaje.accion,
      //   comentario: mensaje.comentario,
      //   fecha: mensaje.fecha,
      //   hora: mensaje.hora
      // }, {
      //   headers: {'content-Type': 'application/x-www-form-urlencoded'}
      // }).pipe(
      //   map((resp: any) => {
      //     return resp;
      //   })
      // );
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

  enviarPago(data: any) {
    // Solicitar por Socket
    return new Promise((resolve, reject) => {
      this.ws.acciones('movil-enviar-pago', data, (resp) => {
        resolve(resp);
      });
    });

    // Solicitar por HTTP
    // const url = 'http://177.244.55.122/api/visitas.php?opcion=2';
    // return this.http.post(url, {
    //   datos: data
    // }, {
    //   headers: {'content-Type': 'application/x-www-form-urlencoded'}
    // });
  }

  solicitarAsesores() {
    return new Promise((resolve, reject) => {
      this.ws.acciones('movil-obtener-asesores', {}, (resp: any) => {
        resolve(resp);
      });
    });
  }

  cambiarRuta(id: any, ruta: number) {
    return new Promise((resolve, reject) => {
      this.ws.acciones('movil-cambiar-ruta', {id, ruta}, (resp: any) => {
        resolve(resp);
      });
    });
  }
}
