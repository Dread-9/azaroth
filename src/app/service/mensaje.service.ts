import { Injectable } from '@angular/core';
import { Mensaje } from '../interface/mensaje.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private mensajesCollection = this.firestore.collection<Mensaje>('Mensajes');

  constructor(private firestore: AngularFirestore) {}

  enviarMensaje(mensaje: Mensaje) {
      return this.mensajesCollection.add(mensaje);
  }

  obtenerMensajesPorGrupo(grupoId: string) {
      return this.firestore
          .collection<Mensaje>('Mensajes', (ref) =>
              ref.where('grupoId', '==', grupoId).orderBy('fechaEnvio', 'asc')
          )
          .valueChanges({ idField: 'id' });
  }
}
