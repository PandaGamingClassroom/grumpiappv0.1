import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryPage } from './inventory.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryPage,
    children: [
      {
        path: 'medals',
        loadChildren: () => import('../inventory/medals/tab1.module').then(m => m.Tab1PageModule)
      
      },
      {
        path: 'creatures',
        loadChildren: () => import('../inventory/creatures/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'others',
        loadChildren: () => import('../inventory/others/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/profile/inventory/medals',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryPageRoutingModule {}
