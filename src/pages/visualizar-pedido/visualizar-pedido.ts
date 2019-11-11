import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProdutoModel } from '../../app/models/produtoModel';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { PedidosModel } from '../../app/models/pedidosModel';



@IonicPage()
@Component({
  selector: 'page-visualizar-pedido',
  templateUrl: 'visualizar-pedido.html',
})
export class VisualizarPedidoPage {


pedido: PedidosModel = new PedidosModel();
pedidosList:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public pedidoSrv: PedidoProvider,
     public ViewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    //this.pedido = <PedidosModel>this.navParams.get('prod');
  }
  voltar() {
    this.ViewCtrl.dismiss();
  }

}
