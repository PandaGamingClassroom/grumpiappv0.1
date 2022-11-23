import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GRUMPI } from 'src/app/models/grumpi.model';
import { GrumpisService } from 'src/app/services/grumpis.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-fight-display',
  templateUrl: './fight-display.page.html',
  styleUrls: ['./fight-display.page.scss'],
})
export class FightDisplayPage implements OnInit {

  // Grumpis que se envían a otro componente
  @Input() gumpiToSend: any[] = [];

  // Equipo que se envía a la ventana team-selected
  @Output() grumpiList: any[] = [];

  // Listado de Grumpis del equipo
  @Output() gumpiSelectedList: any[] = [];

  grumpi: GRUMPI = {};
  checked = false;
  contador: number = 0;
  allComplete: boolean = false;
  haveAllGrumpis: boolean = false;
  audio = new Audio('../../../assets/sound/button-click-off-click.mp3');

  grumpiName: string = '';
  grumpiDesc: string = '';
  gumpiImg: any;

  @ViewChild('popover') popover: any;
  isOpen = false;

  constructor(private route: Router, private grumpisService: GrumpisService, private storeService: StoreService) { }

  ngOnInit() {

    // let bugi: GRUMPI = {
    //   name: "Bugi",
    //   description: "Pequeño gusano con forma de seta, la cual utiliza para pasar inadvertido de sus depredadores.",
    //   img: "../../../../assets/img/001.jpg",
    //   checked: false
    // }

    // let bolibugi: GRUMPI = {
    //   name: "Bolibugi",
    //   description: "Forma evolucionada de Bugi. Recubre su cuerpo con una protección para defenderse de los atacantes mientras consigue su forma definitiva. Se dice que rueda felizmente por los bosques.",
    //   img: "../../../../assets/img/002.jpg",
    //   checked: false
    // }

    // let bugelion: GRUMPI = {
    //   name: "Bugelion",
    //   description: "Forma evolucionada de Bolibugi. Una vez roto su cascarón usa parte de él como espada y como escudo para batallar con los enemigos.",
    //   img: "../../../../assets/img/003.jpg",
    //   checked: false
    // }

    // let goti: GRUMPI = {
    //   name: "Goti",
    //   description: "Tiene forma de gota de agua. Estos grumpis nacen de las tormentas de verano. Son muy miedosos y difíciles de encontrar, ya que viven en lagos y no se les puede ver con facilidad.",
    //   img: "../../../../assets/img/004.jpg",
    //   checked: false
    // }

    // let cubi: GRUMPI = {
    //   name: "Cubi",
    //   description: "Forma evolucionada de Goti. Se crea en la ciudad al esconderse de los humanos en cubos para no ser vistos. Dicen que se pueden ver algunos de ellos en los lagos.",
    //   img: "../../../../assets/img/005.jpg",
    //   checked: false
    // }

    // this.grumpiList[0] = bugi;
    // this.grumpiList[1] = bolibugi;
    // this.grumpiList[2] = bugelion;
    // this.grumpiList[3] = goti;
    // this.grumpiList[4] = cubi;


    this.storeService.getCreatures().subscribe((creaturesList) => {
      this.grumpiList = [];
      creaturesList.forEach((catData: any) => {
        this.grumpiList.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    });

  }

  /**
   * Revisamos la lista de Criaturas
   * Marcamos con un máximo de 3 los Grumpis que se pueden seleccionar
   * @param grumpiSelected 
   */
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
    if (contador === 3) {
      return this.allComplete = true;
    } else {
      return this.allComplete = false;
    }
  }


  /**
   * Hacemos sonar el click en pantalla
   * Suena cuando se selecciona algún elemento
   * 
   */
  clickSound() {
    this.audio.play();
  }

  aceptTerms() {
    this.clickSound();
    if (this.gumpiToSend.length === 3) {
      this.grumpiList = this.gumpiToSend;
      this.haveAllGrumpis = true;
      this.grumpisService.set(this.grumpiList);
      this.route.navigate(['/fight-display/combat-screen']);
    } else {
      
      this.isOpen = true;
      // this.dialog.open(ErrorMessageComponent, { data: {} });
    }
  }

  /**
   * Se limpia la selección que se ha realizado.
   * allCompleteuelve a dejar libre los checkbox para nueva selección.
   */
  descheckSelection() {
    this.allComplete = false;
    this.grumpiList.forEach(node => node.isSelected = false);
  }
}
