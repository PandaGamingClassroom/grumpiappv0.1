import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public folder!: string;
  audio = new Audio('../../../assets/sound/button-click-off-click.mp3');
  title = 'LOS GRUMPIES';

  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Mapa Grumpi', url: '/map', icon: 'map' },
    { title: 'Tienda Grumpi', url: '/shop-page', icon: 'storefront' },
    { title: 'Combate Grumpi', url: '/fight-display', icon: 'sparkles' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'GrumpiApp', url: '/about', icon: 'cog' },
  ];

  constructor(private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  goAbout() {
    this.clickSound();
    this.route.navigate(['/about']);
  }

  clickSound() {
    this.audio.play();
  }

  goMoreInfoPage() {
    this.clickSound();
    this.route.navigate(['/home/more-info']);
  }

  juego() {
    this.route.navigate(['../../../assets/www/index.html']);
  }
}
