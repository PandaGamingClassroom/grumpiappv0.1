import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FightDisplayPageRoutingModule } from './fight-display-routing.module';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { FightDisplayPage } from './fight-display.page';
import { GrumpisService } from 'src/app/services/grumpis.service';
import { StoreService } from 'src/app/services/store/store.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FightDisplayPageRoutingModule,
    MatCheckboxModule
  ],
  declarations: [FightDisplayPage],
  providers: [GrumpisService, StoreService]
})
export class FightDisplayPageModule {}
