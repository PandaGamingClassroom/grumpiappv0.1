import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'admin-page',
    loadChildren: () => import('./components/admin-page/admin-page.module').then( m => m.AdminPagePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./components/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'fight-display',
    loadChildren: () => import('./components/fight-display/fight-display.module').then( m => m.FightDisplayPageModule)
  },
  {
    path: 'shop-page',
    loadChildren: () => import('./components/shop-page/shop-page.module').then( m => m.ShopPagePageModule)
  },
  {
    path: 'tasks-page',
    loadChildren: () => import('./components/tasks-page/tasks-page.module').then( m => m.TasksPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
