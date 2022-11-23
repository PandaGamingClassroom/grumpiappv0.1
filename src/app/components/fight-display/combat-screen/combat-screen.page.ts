import { Component, Input, OnInit } from '@angular/core';
import { GRUMPI } from 'src/app/models/grumpi.model';
import { GrumpisService } from 'src/app/services/grumpis.service';

@Component({
  selector: 'app-combat-screen',
  templateUrl: './combat-screen.page.html',
  styleUrls: ['./combat-screen.page.scss'],
})
export class CombatScreenPage implements OnInit {

  @Input() gumpiSelectedList: any[] = [];
  allComplete: boolean = false;
  grumpi: GRUMPI = {};
  contador: number = 0;
  // Grumpis que se envían a otro componente
  @Input() gumpiToSend: any[] = [];

  constructor(private grumpisService: GrumpisService) { }

  ngOnInit() {
    this.gumpiSelectedList = this.grumpisService.get();
    console.log('MI EQUIPO: ', this.gumpiSelectedList);
  }

  someComplete(grumpiSelected: any) {
    let checkGrumpi = false;
    console.log('SELECCION: ', grumpiSelected);

    if (grumpiSelected.checked == false) {
      this.grumpi.checked = grumpiSelected.checked = true;
      this.gumpiToSend = this.addToList(grumpiSelected);
    } else {
      this.grumpi.checked = grumpiSelected.checked = false;
    }

    if (grumpiSelected.checked === true) {
      this.contador++;
      checkGrumpi = this.checkGrumpis(this.contador);
    }

  }

  /**
* Se comprueban las criaturas marcadas con check
* Se guardan en una lista 
* 
* @param creatureSelected 
* @returns Devuelve la lista de criaturas seleccionadas
*/
  addToList(creatureSelected: GRUMPI): any[] {
    if (creatureSelected.checked === true) {
      this.gumpiToSend.push(creatureSelected);
      return this.gumpiToSend;
    }
    return this.gumpiToSend;
  }


  /**
   * Revisamos el máximo nº de Grumpis seleccionados
   * Máx = 3
   * @param contador Número de criaturas seleccionadas
   */
  checkGrumpis(contador: number): boolean {
    if (contador === 1) {
      return this.allComplete = true;
    } else {
      return this.allComplete = false;
    }
  }
}
