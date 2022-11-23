import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  audio = new Audio('../../../assets/sound/button-click-off-click.mp3');

  constructor(private _bottomSheetRef: MatBottomSheetRef<MainMenuPage>,
    private route: Router) { }

  ngOnInit() {
  }

  clickSound() {
    this.audio.play();
  }

  goFightDisplay() {
    this.clickSound();
    this.route.navigate(['/figthDisplay']);
    this._bottomSheetRef.dismiss();
  }


  goMap() {
    this.clickSound();
    this.route.navigate(['/map']);
    this._bottomSheetRef.dismiss();
  }

  goCompleteProfile() {
    this.clickSound();
    this.route.navigate(['/profile']);
    this._bottomSheetRef.dismiss();
  }

  goShopPage() {
    this.clickSound();
    this.route.navigate(['/shop']);
    this._bottomSheetRef.dismiss();
  }
}
