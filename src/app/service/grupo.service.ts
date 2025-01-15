import { Injectable } from '@angular/core';
import { Grupo } from '../interface/grupo.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import the firestore module

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private gruposCollection = this.firestore.collection<Grupo>('Grupos');

  constructor(private firestore: AngularFirestore) {}

  crearGrupo(grupo: Grupo) {
      return this.gruposCollection.add(grupo);
  }

  obtenerGrupos() {
      return this.gruposCollection.valueChanges({ idField: 'id' });
  }

  agregarMiembro(grupoId: string, usuarioId: string) {
    return this.gruposCollection.doc(grupoId).update({
      miembros: firebase.firestore.FieldValue.arrayUnion(usuarioId), // Uso de FieldValue
    });
  }
}
