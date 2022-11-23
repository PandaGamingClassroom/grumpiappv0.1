import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';

import { MainMenuPageRoutingModule } from './main-menu-routing.module';

import { MainMenuPage } from './main-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MainMenuPageRoutingModule
  ],
  declarations: [MainMenuPage]
})
export class MainMenuPageModule {}
