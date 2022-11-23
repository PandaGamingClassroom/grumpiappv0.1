import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowTasksPageRoutingModule } from './follow-tasks-routing.module';

import { FollowTasksPage } from './follow-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowTasksPageRoutingModule
  ],
  declarations: [FollowTasksPage]
})
export class FollowTasksPageModule {}
