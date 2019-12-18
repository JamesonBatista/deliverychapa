import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AlertProvider } from '../../providers/alert/alert';
import { ConfigHelper } from '../../app/helpers/configHelper';


@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  emailUser;
  nameUser;
  emailreset: any = {};
  userSendEmail;
  excluirUser;
  foto;
  password_type: string = 'password';
  currentImage: any;
  fotoIcon;
  email;
  nome;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private usuarioSrv: UsuarioProvider,
    private alertCtrl: AlertProvider) {
      this.getFoto();
  }

  ionViewDidLoad() {
  }
  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }
  cancelar() {
    this.navCtrl.setRoot('LoginPage');
  }

  getUser() {
    let user = this.usuarioSrv.get();
    user.then(data => {
      if (data.success) {
        this.emailreset = <Array<UsuarioModel>>data.data
        for (let i = 0; i < this.emailreset.length; i++) {
          const res = this.emailreset[i];
          this.excluirUser = res;
          if (this.excluirUser.email === this.emailUser) {
            this.email = this.excluirUser.email;
            this.nome = this.excluirUser.nome
          }

        }
        if(this.nameUser ===undefined || this.emailUser === undefined){
        this.alertCtrl.toast('Por favor preencha os campos!','bottom')

        }
        else{
          if (this.email === this.emailUser && this.nome === this.nameUser) {
            this.excluir(this.excluirUser._id);

          } else {
            this.alertCtrl.toast('Seu e-mail ou usuário não foram encontrados em nossos registos, tente novamente!', 'bottom')
          }
        }

      }
    });
  }
  async excluir(emailUser: string): Promise<void> {
    try {
      let excluirResult = await this.usuarioSrv.delete(emailUser);
      if (excluirResult.success) {
        this.alertCtrl.toast('Seu registo foi Removido, faça seu cadastro novamente!', 'bottom')
        this.navCtrl.setRoot('CadastroPage')
      }
    } catch (error) {
      console.log('Erro ao excluir', error);
    }
  }
  getFoto() {
    let resposta = localStorage.getItem(ConfigHelper.storageName.foto);
    this.foto = resposta;
    let fotoIcon = localStorage.getItem(ConfigHelper.storageName.fotoIcon);
    this.fotoIcon = fotoIcon;
  }


}
