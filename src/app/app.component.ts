import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Mapa Grumpi', url: '/map', icon: 'map' },
    { title: 'Tienda Grumpi', url: '/shop-page', icon: 'storefront' },
    { title: 'Evoluciones Grumpi', url: '/evolutions', icon: 'git-network' },
    { title: 'Combate Grumpi', url: '/fight-display', icon: 'sparkles' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'GrumpiApp', url: '/about', icon: 'cog' },
  ];

  constructor() { }

  ngOnInit(): void {
    /**
     * TOKEN de la librería MAPBOX-GL para cargar el mapa
     */
    (mapboxgl as any).accessToken = environment.mapBoxToken;
  }

}
