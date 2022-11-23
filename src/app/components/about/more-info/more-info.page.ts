import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {

  audio = new Audio('../../../assets/sound/button-click-off-click.mp3');

  constructor(private route: Router) { }

  ngOnInit() {
  }

  clickSound() {
    this.audio.play();
  }

  goHome() {
    this.clickSound();
    this.route.navigate(['/home']);
  }

  goGetCreatures() {
    this.clickSound();
    this.route.navigate(['/about/more-info/creatures']);
  }

  goGetCup() {
    this.clickSound();
    this.route.navigate(['/about/more-info/cup']);
  }

  goGetMedals() {
    this.clickSound();
    this.route.navigate(['/about/more-info/medals']);
  }

  goGetCombats() {
    this.clickSound();
    this.route.navigate(['/about/more-info/fight']);
  }

  goGetLegendCards() {
    this.clickSound();
    this.route.navigate(['/about/more-info/creature-cards']);
  }

  goEvolutions() {
    this.clickSound();
    this.route.navigate(['/about/more-info/evolutions']);
  }

  goMap() {
    this.clickSound();
    this.route.navigate(['/about/more-info/map']);
  }
}
