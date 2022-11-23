import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-tasks',
  templateUrl: './follow-tasks.page.html',
  styleUrls: ['./follow-tasks.page.scss'],
})
export class FollowTasksPage implements OnInit {

  isModalOpen = false;
  
  constructor() { }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
