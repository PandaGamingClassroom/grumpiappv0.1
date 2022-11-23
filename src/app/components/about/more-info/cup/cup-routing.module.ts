import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CupPage } from './cup.page';

const routes: Routes = [
  {
    path: '',
    component: CupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CupPageRoutingModule {}
