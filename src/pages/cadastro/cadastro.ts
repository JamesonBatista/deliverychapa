import { AlertProvider } from './../../providers/alert/alert';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigHelper } from '../../app/helpers/configHelper';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuarioSrv: UsuarioProvider,
    private alertSrv: AlertProvider
  ) {


  }

  async cadastrar(): Promise<void> {
    let cadastroResult = await this.usuarioSrv.register(this.usuario);
    if (cadastroResult.success) {
      this.alertSrv.toast('Cadastro realizado com sucesso!', 'bottom');
      localStorage.setItem(ConfigHelper.storageName.userName, this.usuario.nome)
      this.navCtrl.setRoot('LoginPage');
    }
  }

  cancelar() {
    this.navCtrl.setRoot('LoginPage');
  }

}
