import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-the-game',
  templateUrl: './the-game.page.html',
  styleUrls: ['./the-game.page.scss'],
})
export class TheGamePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    
  }


  goBack() {
    this.route.navigate(['/about']);
  }



}
