import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImeiService {

  constructor(
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    private tstController: ToastController
  ) { }

  async getImeiN() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        // throw new Error('Permissions required');
        const toast = this.tstController.create({
          message: 'No se dio permiso',
          duration: 2000,
          position: 'middle'
        });
        toast.then((to) => {to.present(); });
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    return this.uid.IMEI;
   }
}
