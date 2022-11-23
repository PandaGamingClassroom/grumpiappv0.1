import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  audio = new Audio('../../../assets/sound/button-click-off-click.mp3');

  constructor(private route: Router) { }

  ngOnInit() {
    
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
 
}
