import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Maps
import { AgmCoreModule } from '@agm/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApgyf9zpctTzuckqSRRYiA9wgrVKeWGFY'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions,
    Uid
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
