import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosPage } from './produtos';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProdutosPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(ProdutosPage),
  ],
})
export class ProdutosPageModule { }
