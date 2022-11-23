import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedalsPageRoutingModule } from './medals-routing.module';

import { MedalsPage } from './medals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedalsPageRoutingModule
  ],
  declarations: [MedalsPage]
})
export class MedalsPageModule {}
