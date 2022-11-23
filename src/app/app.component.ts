import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Mapa Grumpi', url: '/map', icon: 'map' },
    { title: 'Tienda Grumpi', url: '/shop-page', icon: 'storefront' },
    { title: 'Combate Grumpi', url: '/fight-display', icon: 'sparkles' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'GrumpiApp', url: '/about', icon: 'cog' },
  ];
  constructor() {}
}
