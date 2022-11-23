import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksPagePage } from './tasks-page.page';

const routes: Routes = [
  {
    path: '',
    component: TasksPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksPagePageRoutingModule {}
