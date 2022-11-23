import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombatScreenPage } from './combat-screen.page';

const routes: Routes = [
  {
    path: '',
    component: CombatScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombatScreenPageRoutingModule {}
