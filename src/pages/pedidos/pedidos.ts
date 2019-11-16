import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { PedidosModel } from '../../app/models/pedidosModel';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

pedido: Array<PedidosModel> = new Array<PedidosModel>();

lista;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private pedidosSrv: PedidoProvider,
     private ModalCtrl: ModalController,
     private ViewCtrl: ViewController,) {

  }

  ionViewWillEnter(){
   this.load();
  }

async load(): Promise<void>{
try {
  let pedidosresult = await this.pedidosSrv.getOrder();
  if(pedidosresult.success){
this.pedido = <Array<PedidosModel>>pedidosresult.data;
  }
} catch (error) {
  console.log('Erro ao carregar todos os Pedidos: ', error)
}
}
visualizarPedidos(item: PedidosModel){
  let modal = this.ModalCtrl.create('VisualizarPedidoPage', { product: item });
  modal.present();
}
  voltar() {
    this.ViewCtrl.dismiss();
  }
}
