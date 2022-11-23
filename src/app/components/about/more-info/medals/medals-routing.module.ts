import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedalsPage } from './medals.page';

const routes: Routes = [
  {
    path: '',
    component: MedalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedalsPageRoutingModule {}
