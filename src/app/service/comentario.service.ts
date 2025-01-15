import { Injectable } from '@angular/core';
import { Comentario } from '../interface/comentario.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private comentariosCollection = this.firestore.collection<Comentario>('Comentarios');

  constructor(private firestore: AngularFirestore) {}

  agregarComentario(comentario: Comentario) {
      return this.comentariosCollection.add(comentario);
  }

  obtenerComentariosPorMensaje(mensajeId: string) {
      return this.firestore
          .collection<Comentario>('Comentarios', (ref) =>
              ref.where('mensajeId', '==', mensajeId).orderBy('fechaCreacion', 'asc')
          )
          .valueChanges({ idField: 'id' });
  }
}
