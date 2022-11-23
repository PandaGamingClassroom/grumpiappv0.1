import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/interfaces/loginData.interface';
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

  form!: FormGroup;

  constructor(public userService: UsersService, 
    private route: Router,
    public authService: AuthService, 
    private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.formData.emit(this.form.value);
  }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.route.navigate(['/home']))
      .catch((e) => console.log(e.message));
  }


  /**
  * Recogemos los datos de inicio de sesión del usuario.
  */
  // login() {
  //   console.log(this.email);
  //   console.log(this.password);
  //   const user = { email: this.email, password: this.password };
  //   this.userService.login(user).subscribe(data => {
  //     console.log(data);

  //   });

  //   /**
  //    * Comprobamos el acceso del usuario
  //    * Si las credenciales son las de admin, nos redirecciona a la ventana de administrador.
  //    * TODO: Cambiar las credenciales admin.
  //    */
  //   // if (this.adminUser === this.email && this.adminPassword === this.password) {
  //   //   this.goAdminPage();
  //   // } else {
  //   //   this.goHome();
  //   // }

  // }

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
