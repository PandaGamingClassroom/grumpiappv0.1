import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatureCardsPageRoutingModule } from './creature-cards-routing.module';

import { CreatureCardsPage } from './creature-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatureCardsPageRoutingModule
  ],
  declarations: [CreatureCardsPage]
})
export class CreatureCardsPageModule {}
