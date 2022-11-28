import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(
        private firestore: AngularFirestore, private storage: AngularFireStorage
    ) { }
    //Crea un nuevo Grumpi
    public createAlumn(data: { nombre: string, url: string }) {
        return this.firestore.collection('alumnos').add(data);
    }
    //Obtiene un Grumpi
    public getAlumn(documentId: string) {
        return this.firestore.collection('alumnos').doc(documentId).snapshotChanges();
    }
    //Obtiene todos los Grumpis
    public getAlumns() {
        return this.firestore.collection('alumnos').snapshotChanges();
    }
    //Actualiza un Grumpi
    public updateAlumns(documentId: string, data: any) {
        return this.firestore.collection('alumnos').doc(documentId).set(data);
    }

}