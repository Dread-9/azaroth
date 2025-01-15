export interface Comentario {
    id: string; // ID único del comentario
    mensajeId: string; // ID del mensaje asociado
    usuarioId: string; // ID del usuario que comentó
    contenido: string; // Texto del comentario
    fechaCreacion: Date;
}