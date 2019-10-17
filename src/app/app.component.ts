import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

// Plugins
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// Servicios
import { WsService } from './services/ws.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private iab: InAppBrowser,
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

  config() {
    this.router.navigate(['/config']);
    this.menu.close();
  }

  existencias() {
    this.router.navigate(['/existencias']);
    this.menu.close();
  }

  lista() {
    this.menu.close();
    const url = `https://ferremayoristas.com.mx/lista`;
    const browser = this.iab.create(url, '_blank');
    browser.show();
  }

  estadoCuenta() {
    this.router.navigate(['/edocta']);
    this.menu.close();
  }
}
