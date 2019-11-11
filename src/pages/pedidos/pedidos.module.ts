import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosPage } from './pedidos';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [
    PedidosPage,
  ],
  imports: [
PipesModule,
ComponentsModule,
    IonicPageModule.forChild(PedidosPage),
  ],
})
export class PedidosPageModule {}
