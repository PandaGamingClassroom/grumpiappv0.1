import { Injectable } from '@angular/core';

/**
 * SERVICIO DE CRIATURAS GRUMPIS 
 * 
 * 
 */

@Injectable({
    providedIn: 'root'
})
export class GrumpisService {
    constructor() {

    }

    /**
     * Obtenemos una lista de criaturas guardadas en el storage
     * 
     * @returns Devuelve una lista de criaturas
     */
    get() {
        return JSON.parse(localStorage.getItem('equipo_grumpi') || '[]');
    }

    /**
     * Guardamos una lista de criaturas en el storage
     * 
     * @param dataSource Recibe la lista de criaturas
     */
    set(dataSource: any[]) {
        localStorage.setItem('equipo_grumpi', JSON.stringify(dataSource));
    }

    setToCombat(dataSource: any[]) {
        localStorage.setItem('grumpi_combate', JSON.stringify(dataSource));
    }
}