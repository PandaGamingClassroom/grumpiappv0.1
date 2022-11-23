import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FollowTasksPage } from './follow-tasks/follow-tasks.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  message = 'This modal example uses the modalController to present and dismiss modals.';
  audio = new Audio('../../../assets/sound/button-click-off-click.mp3');
  isModalOpen = false;

  constructor(private modalCtrl: ModalController, private route: Router) { }

  ngOnInit() {
  }

  clickSound() {
    this.audio.play();
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openInventory() {
    this.route.navigate(['/profile/inventory/medals']);
  }

  openCreatures() {
    this.route.navigate(['/profile/inventory/creatures']);
  }
}
