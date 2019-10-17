import { Injectable } from '@angular/core';

// Socket
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
    this.checkStatusServer();
  }

  checkStatusServer() {
    this.socket.on('connect', () => {
      console.log('OnLine-Server');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('OffLine-Server');
      this.socketStatus = false;
    });
  }

  acciones(evento: string, payload?: any, callback?: (e: any) => void) {
    this.socket.emit(evento, payload, callback);
    callback(this.socket.fromEvent(evento));
  }

  escuchar(evento: string) {
    return this.socket.fromEvent(evento);
  }

  distancia(data: any) {
    return new Promise((resolve, reject) => {
      this.acciones('movil-distancia', data, resp => {
        resolve(resp);
      });
    });
  }
}
