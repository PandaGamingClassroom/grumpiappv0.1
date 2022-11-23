import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { LoginData } from 'src/app/models/interfaces/loginData.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private auth: Auth) { }

    login({ email, password }: LoginData) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }
}