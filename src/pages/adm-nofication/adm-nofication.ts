import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoModel } from '../../app/models/produtoModel';
import { ColorProvider } from '../../providers/color/color';
declare var window;

@IonicPage()
@Component({
  selector: 'page-adm-nofication',
  templateUrl: 'adm-nofication.html',
})
export class AdmNoficationPage {

  usuarios: ProdutoModel = new ProdutoModel();
  user;
  idSignal;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userSignal: ColorProvider,
  ) {
  }

  ionViewDidLoad() {
  }
  async userFull() {
    let resposta = await this.userSignal.get();
    if (resposta.success) {
      for (let index = 0; index < resposta.data.length; index++) {
        const signal = resposta.data[index];
        this.idSignal = signal.usuarioSignal;
        this.sendMessageOrderSignal();
      }
    }
  }

  sendMessageOrderSignal() {

    let notification = {
      contents: {
        en: `${this.user} `
      },
      include_player_ids: [this.idSignal]
    }
    window.plugins.OneSignal.postNotification(notification, this.idSignal);

  }

}
