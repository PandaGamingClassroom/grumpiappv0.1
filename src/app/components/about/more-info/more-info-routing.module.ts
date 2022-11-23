import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreInfoPage } from './more-info.page';

const routes: Routes = [
  {
    path: '',
    component: MoreInfoPage
  },
  {
    path: 'creatures',
    loadChildren: () => import('./creatures/creatures.module').then( m => m.CreaturesPageModule)
  },
  {
    path: 'cup',
    loadChildren: () => import('./cup/cup.module').then( m => m.CupPageModule)
  },
  {
    path: 'medals',
    loadChildren: () => import('./medals/medals.module').then( m => m.MedalsPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'fight',
    loadChildren: () => import('./fight/fight.module').then( m => m.FightPageModule)
  },
  {
    path: 'evolutions',
    loadChildren: () => import('./evolutions/evolutions.module').then( m => m.EvolutionsPageModule)
  },
  {
    path: 'creature-cards',
    loadChildren: () => import('./creature-cards/creature-cards.module').then( m => m.CreatureCardsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreInfoPageRoutingModule {}
