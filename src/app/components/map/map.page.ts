import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';


import { HttpClient } from '@angular/common/http';

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
  zoomLevel: number = 5.07;

  /**
   * Listado de marcadores para el mapa
   */
  marcadores: mapboxgl.Marker[] = [];
  listaMarcadores: any[] = [];


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getMapData();
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
   * Se obtienen los datos de la localización a través de un JSON
   */
  getMapData() {
    this.httpClient.get("assets/map.json").subscribe((data: any) => {
      data.features.forEach((data: any) => {
        this.listaMarcadores.push(data);
        console.log('LISTA DE MARCADORES: ', data);
        
      })
    });
  }

  /**
   * Posición de las marcas en el mapa
   */
  markers() {

    let nameCountry;

    this.listaMarcadores.forEach(mark => {
      nameCountry = mark.properties.nombre;
      console.log('NOMBRES PROVINCIAS: ', nameCountry);
      
      new mapboxgl.Marker()
        .setLngLat(mark.geometry.coordinates)
        .addTo(this.mapa)
        .setPopup(
          new mapboxgl.Popup({ offset: 30 })
            .setHTML(
              `
              <div style="color: black;">
                <h3> ${{ nameCountry }} </h3> <button>Lo quiero</button>
              </div>
              `
            )
        )
    });

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
   * Modifica el zoom que se realiza a través de la barra de zoom
   * 
   * @param valor Recibe el valor del zoom de la barra
   */
  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }

  /**
   * Nos envía a la localización del marcador seleccionado
   * 
   * @param marcador Marcador seleccionado
   */
  irMarcador(marcador: any) {
    this.mapa.flyTo({
      center: marcador.geometry.coordinates,
      zoom: 9.36
    });
  }


  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { });
    this.mapa.off('zoomend', () => { });
  }
}
