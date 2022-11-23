import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowTasksPage } from './follow-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: FollowTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowTasksPageRoutingModule {}
