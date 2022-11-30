import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TheGamePage } from './the-game.page';

const routes: Routes = [
  {
    path: '',
    component: TheGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TheGamePageRoutingModule {}
