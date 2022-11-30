import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TheGamePageRoutingModule } from './the-game-routing.module';

import { TheGamePage } from './the-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TheGamePageRoutingModule
  ],
  declarations: [TheGamePage]
})
export class TheGamePageModule {}
