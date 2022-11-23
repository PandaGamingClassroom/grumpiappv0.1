import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
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

  // Criatura que se va a utilizar en combate
  creatureToCombat: any[] = [];

  // Configuración ventana modal (Selección de Grumpi)
  canDismiss = false;
  presentingElement: any;
  @ViewChild(IonModal)
  modal!: IonModal;

  constructor(private grumpisService: GrumpisService, public modalController: ModalController) { }

  ngOnInit() {
    this.gumpiSelectedList = this.grumpisService.get();
    console.log('MI EQUIPO: ', this.gumpiSelectedList);
  }

  cancel() {
    this.modalController.dismiss();
  }

  /**
   * Comprobamos los Grumpis seleccionados.
   * Solo se permite seleccionar uno.
   * Este seleccionado será el que se utilice en combate.
   * 
   * @param grumpiSelected Grumpi que ha seleccionado el usuario.
   */
  someComplete(grumpiSelected: any) {
    let checkGrumpi = false;

    if (grumpiSelected.isSelected == true) {
      this.contador++;
      checkGrumpi = this.checkGrumpis(this.contador);
      this.grumpi.checked = grumpiSelected.isSelected = true;
      this.gumpiToSend.push(grumpiSelected);
    }

  }

  /**
   * Al aceptar la selección del Grumpi para el combate
   * este se guarda en memoria para mostrarlo en la ventana del combate
   */
  acceptSelectionCreature() {
    console.log('Grumpi para luchar: ', this.gumpiToSend);
     this.grumpisService.setToCombat(this.gumpiToSend);
    this.creatureToCombat = this.gumpiToSend
    this.cancel();
  }

  /**
   * Revisamos el máximo nº de Grumpis seleccionados
   * Máx = 1
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
