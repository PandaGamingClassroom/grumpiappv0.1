import { Component, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { GRUMPI } from 'src/app/models/grumpi.model';
import { GrumpisService } from 'src/app/services/grumpis.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-fight-display',
  templateUrl: './fight-display.page.html',
  styleUrls: ['./fight-display.page.scss'],
})
export class FightDisplayPage implements OnInit, OnDestroy {

  // Grumpis que se envían a otro componente
  @Input() gumpiToSend: GRUMPI[] = [];

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

  // Atrib. Criaturas
  grumpiName: string = '';
  grumpiDesc: string = '';
  gumpiImg: any;

  chargeData: boolean = false;

  @ViewChild('popover') popover: any;
  isOpen = false;

  constructor(private route: Router, 
    private grumpisService: GrumpisService, 
    private storeService: StoreService,
    private storage: AngularFireStorage
    ) { 
   
    }

  ngOnInit() {
    this.chargeCreatures();
    
  }

  /**
   * Revisamos la lista de Criaturas
   * Marcamos con un máximo de 3 los Grumpis que se pueden seleccionar
   * @param grumpiSelected 
   */
  someComplete(grumpiSelected: any) {
    let checkGrumpi = false;
    if (grumpiSelected.isSelected == true) {
      this.contador++;
      checkGrumpi = this.checkGrumpis(this.contador);
      this.grumpi.checked = grumpiSelected.isSelected = true;
      this.gumpiToSend.push(grumpiSelected.data);
      console.log('Lista seleccionada: ', this.gumpiToSend);
    } 
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

  chargeCreatures() {
    let urlImg;
    let fileRef;
    let storageRef;
    this.storeService.getCreatures().subscribe((creaturesList) => {
      console.log('creaturesList ', creaturesList);
      this.grumpiList = [];
      creaturesList.forEach((creatureData: any) => {
        this.grumpiList.push({
          id: creatureData.payload.doc.id,
          data: creatureData.payload.doc.data()
        });
       
      })
      console.log('BBDD ', this.grumpiList[0].data);
      this.grumpiList.forEach(img => {
        urlImg = img.data.img;
        storageRef = this.storage.ref('assets/download/' + urlImg);
        fileRef = this.storage.refFromURL(urlImg).getDownloadURL();
        console.log('url imagen ', urlImg);
        console.log('url fileRef ', fileRef);
      })
    });
  }


  /**
   * Se limpia la selección que se ha realizado.
   * allCompleteuelve a dejar libre los checkbox para nueva selección.
   */
  descheckSelection() {
    this.allComplete = false;
    this.grumpiList.forEach(node => node.isSelected = false);
  }

  ngOnDestroy(){
    window.location.reload();
  }

  refresh() {
    window.location.reload();
  } 
  

}
