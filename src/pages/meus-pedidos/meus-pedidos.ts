import { CarrinhoProvider } from './../../providers/carrinho/carrinho';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPedidosModel } from '../../app/models/ListaPedidosModel';
import { PedidosModel } from '../../app/models/pedidosModel';
import { ConfigHelper } from '../../app/helpers/configHelper';

@IonicPage()
@Component({
  selector: 'page-meus-pedidos',
  templateUrl: 'meus-pedidos.html',
})
export class MeusPedidosPage {

  lista: Array<ListaPedidosModel> = new Array<ListaPedidosModel>();
  pedido: Array<PedidosModel> = new Array<PedidosModel>();
  name: any;
  testId;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private carrinhoSrv: CarrinhoProvider) {


  }

  ionViewDidLoad() {
    this.getUser();
    this._getPedidos();
  }

  private async _getPedidos(): Promise<void> {
    try {
      let pedidosResult = await this.carrinhoSrv.GetMeusPedidos();
      if (pedidosResult.success) {
        this.pedido = <Array<PedidosModel>>pedidosResult.data;
        let data = this.pedido.filter(x => x['usuarioId'] ===(this.testId) );
        this.pedido = data;
      }
    } catch (error) {
      console.log('Problema ao carregar os pedidos, motivo: ', error);
    }

  }

  public contaItem(item: ListaPedidosModel): number {
    return ListaPedidosModel.getTotalItens(item.itens);
  }
  getUser(){
   let user = localStorage.getItem(ConfigHelper.storageName.userName)
    this.name = user;
    let id = localStorage.getItem(ConfigHelper.storageName.id);
    this.testId = id
console.log(id)
  }


}
