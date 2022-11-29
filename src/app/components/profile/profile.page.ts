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

  /*********************
   * Variables AVATAR
   *********************/
  modalAvatarsOpen = false;
  avatar_list: any[] = [];
  avatarSelect= '';

  avatar0 = '../../../assets/img/avatar0.jpg';
  avatar1 = '../../../assets/img/avatar1.png';
  avatar2 = '../../../assets/img/avatar2.png';
  avatar3 = '../../../assets/img/avatar3.png';
  avatar4 = '../../../assets/img/avatar4.png';

  constructor(private modalCtrl: ModalController, private route: Router) { }

  ngOnInit() {
    this.avatar_list[0] = this.avatar0;
    this.avatar_list[1] = this.avatar1;
    this.avatar_list[2] = this.avatar2;
    this.avatar_list[3] = this.avatar3;
    this.avatar_list[4] = this.avatar4;

  }

  clickSound() {
    this.audio.play();
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openAvatars(isOpen: boolean) {
    this.modalAvatarsOpen = isOpen;
  }

  openInventory() {
    this.route.navigate(['/profile/inventory/medals']);
  }

  openCreatures() {
    this.route.navigate(['/profile/inventory/creatures']);
  }

  avatarSelected(avatar: any) {
    console.log('Avatar seleccionado: ', avatar);
    this.avatarSelect = avatar;
    this.modalAvatarsOpen = false;
  }

}
