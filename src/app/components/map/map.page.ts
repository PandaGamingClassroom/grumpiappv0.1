import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Marcas } from '../../models/interfaces/geoLocation.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],

})
export class MapPage implements OnInit, OnDestroy {

  /** Control del elemento HTML */
  @ViewChild('mapa') divMapa!: ElementRef;

  /** Inicialización del Mapa con la librería MAPBOX-GL */
  mapa!: mapboxgl.Map;

  /** Control del zoom en el mapa */
  zoomLevel: number = 5.18;

  /**
   * Listado de marcadores para el mapa
   */
  marcadores: mapboxgl.Marker[] = [];
  listaMarcadores: Marcas[] = [];

  /**
   * 
   * MARCADORES DE COMUNIDADES EN EL MAPA
   * 
   */
  madridMarker: [number, number] = [-3.6968750107555226, 40.413968834548996];
  granadaMarker: [number, number] = [-3.5921160031997386, 37.17662711972035];
  almeriaMarker: [number, number] = [-2.457262929199076, 36.8465456517929];
  malagaMarker: [number, number] = [-4.428196056164957, 36.73791493554032];
  cadizMarker: [number, number] = [-6.189117854225306, 36.54827582580875];
  sevillaMarker: [number, number] = [-5.981809821054786, 37.374947978046094];
  huelvaMarker: [number, number] = [-6.941693596056062, 37.274399566670816];
  cordobaMarker: [number, number] = [-4.791758753424231, 37.87378779802737];
  jaenMarker: [number, number] = [-3.78598153268191, 37.7822072368544];




  constructor() { }

  ngOnInit() {
    console.log();
    
   }


  /**
   * Parámetros para construir el mapa
   */
  buildMap() {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-3.7365441697213613, 40.413732151960396],
      zoom: this.zoomLevel
    });
    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.markers();

  }

  ionViewDidEnter() {
    this.buildMap();
  }

  /**
   * Posición de las marcas en el mapa
   */
  markers() {
    
    this.marcadores = [
      new mapboxgl.Marker()
        .setLngLat(this.madridMarker)
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.granadaMarker)
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.almeriaMarker)
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.malagaMarker)
        .setPopup(
          new mapboxgl.Popup({ offset: 30 }) // add popups
            .setHTML(
              `<h3> Hola </h3><p> adios </p>`
            )
        )
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.cadizMarker)
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.sevillaMarker)
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.huelvaMarker)
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.cordobaMarker)
        .addTo(this.mapa),
      new mapboxgl.Marker()
        .setLngLat(this.jaenMarker)
        .addTo(this.mapa)
    ];

  }

  /**
   * Función para alejar el zoom en el mapa
   */
  zoomOut() {
    this.mapa.zoomOut();
  }

  /**
   * Función para acercar el zoom en el mapa
   */
  zoomIn() {
    this.mapa.zoomIn();
  }

  /**
   * 
   * @param valor Recibe el valor del zoom de la barra
   */
  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }

  irMarcador(marcador: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat(),
      zoom: 9.36
    });
  }

  agregarMarcador() {
    const newMarker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat(this.madridMarker)
      .addTo(this.mapa);

    this.marcadores.push(newMarker);
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { });
    this.mapa.off('zoomend', () => { });
  }
}
