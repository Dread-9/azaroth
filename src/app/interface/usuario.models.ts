export interface Usuario {
    id: string; // ID único del usuario (Firestore UID)
    nombre: string;
    email: string;
    avatarUrl?: string; // URL de la foto de perfil
}