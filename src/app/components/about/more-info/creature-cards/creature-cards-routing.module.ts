import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatureCardsPage } from './creature-cards.page';

const routes: Routes = [
  {
    path: '',
    component: CreatureCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatureCardsPageRoutingModule {}
