import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  audio = new Audio('../../../assets/sound/button-click-off-click.mp3');
  openGameControl = false;
  game = '../../../assets/www/index.html';
  public getScreenWidth: any;
  public getScreenHeight: any;

  gameOk: boolean = true;

  constructor(private route: Router) { }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    
  }

  /**
   * COMPROBACIÓN DE RESOLUCIÓN DE PANTALLA
   * 
   * Se utiliza para cambiar el contenido que se muestra
   * según la resolución de pantallas
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.checkResolution();
  }

  checkResolution() {
    if (this.getScreenWidth < 1024) {
      this.gameOk = false;
    } else if (this.getScreenWidth < 1280) {
      this.gameOk = true;
    } else {
      this.gameOk = true;
    }

  }

  goHome() {
    this.clickSound();
    this.route.navigate(['/home']);
  }


  clickSound() {
    this.audio.play();
  }

  openTwitter() {
    window.open('https://twitter.com/Los_Grumpis', '_system');

  }

  goMoreInfoPage() {
    this.clickSound();
    this.route.navigate(['/home/more-info']);
  }

  goGame() {
    this.clickSound();
    this.route.navigate(['/the-game']);
  }

  openGame(isOpen: boolean) {
    this.openGameControl = isOpen;
  }


}
