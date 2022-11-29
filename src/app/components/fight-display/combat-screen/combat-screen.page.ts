import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  @ViewChild('popover') popover: any;
  @ViewChild('popobject') popobject: any;
  allComplete: boolean = false;
  grumpi: GRUMPI = {};
  contador: number = 0;
  // Grumpis que se envían a otro componente
  @Input() gumpiToSend: any[] = [];

  // Criatura que se va a utilizar en combate
  creatureToCombat: any[] = [];

  creatureOver: boolean = true;
  actualHealth!: number;

  // Configuración ventana modal (Selección de Grumpi)
  canDismiss = false;
  presentingElement: any;
  @ViewChild(IonModal)
  modal!: IonModal;

  isModalOpen = false;
  isOpen = false;

  modalOpenObjects = false;

  objectList: any[] = [];

  obj0 = '../../../../assets/obj/Losa agua.png';
  obj1 = '../../../../assets/obj/Losa aire.png';
  obj2 = '../../../../assets/obj/Losa fuego.png';
  obj3 = '../../../../assets/obj/Losa luz.png';
  obj4 = '../../../../assets/obj/Losa normal.png';
  obj5 = '../../../../assets/obj/Losa oscuridad.png';
  obj6 = '../../../../assets/obj/Losa rayo.png';
  obj7 = '../../../../assets/obj/Losa tierra.png';
  obj8 = '../../../../assets/obj/Losa vida.png';


  constructor(private grumpisService: GrumpisService,
    public modalController: ModalController, private route: Router) { }

  ngOnInit() {
    this.selectNewCreature();
    this.gumpiSelectedList = this.grumpisService.get();
    this.objectList[0] = this.obj0;
    this.objectList[1] = this.obj1;
    this.objectList[2] = this.obj2;
    this.objectList[3] = this.obj3;
    this.objectList[4] = this.obj4;
    this.objectList[5] = this.obj5;
    this.objectList[6] = this.obj6;
    this.objectList[7] = this.obj7;
    this.objectList[8] = this.obj8;
  }

  cancel() {
    this.modalController.dismiss();
  }

  goBack() {
    this.route.navigate(['/home']);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  surrender() {
    this.modalController.dismiss();
    this.route.navigate(['/home']);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  presentPopObject(e: Event) {
    this.popobject.event = e;
    this.modalOpenObjects = true;
  }

  itemSelected(obt: any) {
    console.log('Objeto seleccionado: ', obt);
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
    this.grumpisService.setToCombat(this.gumpiToSend);
    this.creatureToCombat = this.gumpiToSend;
    this.creatureToCombat.forEach((creature: any) => {
      this.actualHealth = creature.health;
    });
    this.selectNewCreature();
    console.log('Grumpi seleccionado: ', this.creatureToCombat);
    console.log('Salud actual: ', this.actualHealth);
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

  selectNewCreature() {
    console.log('Salud actual: ', this.actualHealth);
    
    if (this.actualHealth >= 0) {
      this.creatureOver = false;
    } else {
      this.creatureOver = true;
    }
  }
}
