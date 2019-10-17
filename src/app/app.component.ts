import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Plugins
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

// Servicios
import { WsService } from './services/ws.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ws: WsService,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
    this.ws.escuchar('mensaje-privado').subscribe((msg: any) => {
      localStorage.setItem('mensaje', JSON.stringify(msg));
      // Schedule a single notification
      this.localNotifications.schedule({
        id: 1,
        text: msg.cuerpo,
        sound: platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
        data: { secret: msg.de }
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
