import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPagePageRoutingModule } from './tasks-page-routing.module';

import { TasksPagePage } from './tasks-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPagePageRoutingModule
  ],
  declarations: [TasksPagePage]
})
export class TasksPagePageModule {}
