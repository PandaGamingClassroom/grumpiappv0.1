import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/models/users/users.service';
import { AuthService } from 'src/app/services/login/authService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  /**
   * Credenciales de administrador
   * Da acceso a la ventana de admin
   */
  adminUser = 'admin';
  adminPassword = 'admin';

  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();



  constructor(public userService: UsersService,
    private route: Router,
    public authService: AuthService) { }

  ngOnInit() {



  }


  /**
   * Nos redirige a la ventana principal
   */
  goHome() {
    this.route.navigate(['/home']);
  }

  /**
   * Nos redirecciona a la ventana de administración
   */
  goAdminPage() {
    this.route.navigate(['/adminPage']);
  }

}
