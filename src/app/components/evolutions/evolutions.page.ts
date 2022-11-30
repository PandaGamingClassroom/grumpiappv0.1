import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.page.html',
  styleUrls: ['./evolutions.page.scss'],
})
export class EvolutionsPage implements OnInit {

  creature0 = '../../../assets/img/001.jpg';
  creature1 = '../../../assets/img/002.jpg';
  creature2 = '../../../assets/img/003.jpg';
  creature3 = '../../../assets/img/004.jpg';
  creature4 = '../../../assets/img/005.jpg';
  creature5 = '../../../assets/img/006.jpg';
  creature6 = '../../../assets/img/008.jpg';

  evolution_list: any[] = [];

  creature_details: any[] = [];

  isModalOpen = false;
  isOpen = false;

  grumpi_checked: any[] = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() {

    this.evolution_list[0] = this.creature0;
    this.evolution_list[1] = this.creature1;
    this.evolution_list[2] = this.creature2;
    this.evolution_list[3] = this.creature3;
    this.evolution_list[4] = this.creature4;
    this.evolution_list[5] = this.creature5;
    this.evolution_list[6] = this.creature6;


  }

  creatureSelected(isOpen: boolean, creature: any) {
    this.isModalOpen = isOpen;
    this.creature_details = [];
    this.creature_details = creature;
    
  }

  surrender() {
    this.modalController.dismiss();
  }

  creatureChecked(isOpen: boolean, creature: any) {
    this.isModalOpen = isOpen;
    this.grumpi_checked.push(creature);
    console.log('Grumpi seleccionado para adquirir: ', this.grumpi_checked);
    
  }
}
