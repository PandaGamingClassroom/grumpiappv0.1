import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';




@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(
        private firestore: AngularFirestore, private storage: AngularFireStorage
    ) { }
    //Crea un nuevo Grumpi
    public createCreature(data: { nombre: string, url: string }) {
        return this.firestore.collection('grumpis').add(data);
    }
    //Obtiene un Grumpi
    public getCreature(documentId: string) {
        return this.firestore.collection('grumpis').doc(documentId).snapshotChanges();
    }
    //Obtiene todos los Grumpis
    public getCreatures() {
        return this.firestore.collection('grumpis').snapshotChanges();
    }
    //Actualiza un Grumpi
    public updateCreatures(documentId: string, data: any) {
        return this.firestore.collection('grumpis').doc(documentId).set(data);
    }

}