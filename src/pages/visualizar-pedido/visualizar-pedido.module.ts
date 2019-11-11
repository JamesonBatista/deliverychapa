import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizarPedidoPage } from './visualizar-pedido';

@NgModule({
  declarations: [
    VisualizarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizarPedidoPage),
  ],
})
export class VisualizarPedidoPageModule {}
