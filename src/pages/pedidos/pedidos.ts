import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { ProdutoModel } from '../../app/models/produtoModel';
import { PedidosModel } from '../../app/models/pedidosModel';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

pedido: PedidosModel = new PedidosModel();

lista;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private pedidosSrv: PedidoProvider,
     private ModalCtrl: ModalController,) {

  }

ionViewWillEnter(){
 this.pedidosSrv.pedidosGetAll().then(data=>{
   this.lista = (data.data);
   console.log(data.data)
 })
}
visualizarPedidos(item: PedidosModel){
  let modal = this.ModalCtrl.create('VisualizarPedidoPage', { prod: item });
  modal.present();
}
}
