import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { PedidosModel } from '../../app/models/pedidosModel';
import { CarrinhoModel } from '../../app/models/carrinhoModel';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AlertProvider } from '../../providers/alert/alert';



@IonicPage()
@Component({
  selector: 'page-visualizar-pedido',
  templateUrl: 'visualizar-pedido.html',
})
export class VisualizarPedidoPage {

  carrinho: CarrinhoModel = new CarrinhoModel();
  pedido: PedidosModel = new PedidosModel();
  usuarioLogado: UsuarioModel = new UsuarioModel();
  itens: Array<any> = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoSrv: PedidoProvider,
    public ViewCtrl: ViewController,
    private usuarioSrv: UsuarioProvider,
    private alertCtrl: AlertProvider, ) {

  }

  ionViewDidLoad() {
    this.pedido = <PedidosModel>this.navParams.get('product');
    this.getUser();
    this.get();

  }
  async getUser() {
    try {
      let user = <UsuarioModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user))
      let userResult = await this.usuarioSrv.getByUid(user._id);
      if (userResult.success) {
        this.usuarioLogado = <UsuarioModel>userResult.data;
        if (!this.usuarioLogado.foto)
          this.usuarioLogado.foto = ConfigHelper.photo;
      }
    } catch (error) {
      console.log('Problema ao carregar os dados do usuário');
    }

  }


  voltar() {
    this.ViewCtrl.dismiss();
  }
  get() {
    this.itens = this.pedido.itens;
    let data = this.itens;
    let resul = data;
    console.log(resul)

  }
  sendOrder() {
    try {

      let send = this.alertCtrl.confirm(
        'Confirmação', `Enviar Pedido para ${this.pedido.nomeUser}?`,
        async () => {



      })

    } catch (error) {
      console.log('erro ao tentar enviar o pedido', error)
    }


  }
  acceptOrder() {
    try {

      let accept = this.alertCtrl.confirm(
        'Aceitar Pedido', `Deseja aceitar o Pedido de ${this.pedido.nomeUser}`,
        async () => {




      })

    } catch (error) {
      console.log('erro ao aceitar', error)
    }
  }
  cancelOrder() {
    try {

      let cancel = this.alertCtrl.confirm(
        'Cancelar', `Deseja Cancelar o Pedido de ${this.pedido.nomeUser}?`,
         async () => {




      })



    } catch (error) {
      console.log('erro ao tentar cancelar', error)

    }
  }
}
