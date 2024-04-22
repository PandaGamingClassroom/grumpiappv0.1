import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/interfaces/users.interface';
import { UsersService } from 'src/app/services/users/users.service';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {

  /**
   * Variable para controlar el menú que se contrae
   */
  showMenu: boolean = false;

  usersForm!: FormGroup;

  isSubmitted = false;

  @Output() alumnsList: any[] = [];

  constructor(public formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.chargeAlumns();
    this.usersForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+\.[a-z]{2,3}$')]]
    })
  }

  get errorControl() {
    return this.usersForm.controls;
  }


  submitForm() {

  }

  /**
   * Método para contraer el menú
   */
  expandMenu() {
    if (this.showMenu === false) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }

  chargeAlumns() {

  }

}
