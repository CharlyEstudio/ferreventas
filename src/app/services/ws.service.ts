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

  acciones(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  escuchar(evento: string) {
    return this.socket.fromEvent(evento);
  }
}
