import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CupPageRoutingModule } from './cup-routing.module';

import { CupPage } from './cup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CupPageRoutingModule
  ],
  declarations: [CupPage]
})
export class CupPageModule {}
