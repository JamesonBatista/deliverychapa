import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisoOffPage } from './aviso-off';

@NgModule({
  declarations: [
    AvisoOffPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisoOffPage),
  ],
})
export class AvisoOffPageModule {}
