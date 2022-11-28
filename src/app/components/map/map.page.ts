import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],

})
export class MapPage implements OnInit, AfterViewInit {

  /** Control del elemento HTML */
  @ViewChild('mapa') divMapa!: ElementRef;

  /** Inicialización del Mapa con la librería MAPBOX-GL */
  mapa!: mapboxgl.Map;

  /** Control del zoom en el mapa */
  zoomLevel: number = 5;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-3.6846281526065296, 40.41260465302904],
      zoom: 5
    });
  }

  /**
   * Función para alejar el zoom en el mapa
   */
  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  /**
   * Función para acercar el zoom en el mapa
   */
  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }
}
