import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmPedidosPage } from './adm-pedidos';

@NgModule({
  declarations: [
    AdmPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmPedidosPage),
  ],
})
export class AdmPedidosPageModule {}
