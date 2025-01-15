export interface Mensaje {
    id: string; // ID único del mensaje
    grupoId: string; // ID del grupo donde se envió
    usuarioId: string; // ID del remitente
    contenido: string; // Texto del mensaje
    imagenUrl?: string; // URL de la imagen (si se envía)
    fechaEnvio: Date;
}