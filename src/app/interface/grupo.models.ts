import firebase from 'firebase/compat/app';

export interface Grupo {
  id?: string; // ID único del grupo (autogenerado por Firestore)
  nombre: string; // Nombre del grupo
  descripcion: string; // Descripción del grupo
  miembros: string[] | firebase.firestore.FieldValue; // IDs de los usuarios miembros
  creadorId: string; // ID del usuario que creó el grupo
  imagenUrl?: string; // Imagen opcional para el grupo
  fechaCreacion: firebase.firestore.Timestamp; // Marca de tiempo de creación del grupo
}
