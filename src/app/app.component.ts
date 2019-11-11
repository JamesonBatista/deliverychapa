import { UsuarioProvider } from './../providers/usuario/usuario';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSDisplayType } from '@ionic-native/onesignal';
import { ConfigHelper } from './helpers/configHelper';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = UsuarioProvider.IsLogado ? 'CategoriaPage' : 'LoginPage';


  constructor(
    private platform: Platform,
    private oneSignal: OneSignal,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this._configOneSignal();

    });

  }

  private _configOneSignal(): void {

    if (this.platform.is('cordova')) {

      this.oneSignal.startInit('00e9d794-3770-45e8-9f93-49e05d7a004e');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe(data => {
        console.log('NotificacaoRecebida', data);
      });

      this.oneSignal.handleNotificationOpened().subscribe(data => {
        console.log('NotificacaoAberta', data);
      });

      this.oneSignal.getIds().then(result => {
        localStorage.setItem(ConfigHelper.storageKeys.oneSignalUid, result.userId);
        console.log('OneSignal', JSON.stringify(result));
      });

      this.oneSignal.endInit();

    }
  }

}

