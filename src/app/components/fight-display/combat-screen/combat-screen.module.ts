import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombatScreenPageRoutingModule } from './combat-screen-routing.module';

import { CombatScreenPage } from './combat-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombatScreenPageRoutingModule
  ],
  declarations: [CombatScreenPage]
})
export class CombatScreenPageModule {}
