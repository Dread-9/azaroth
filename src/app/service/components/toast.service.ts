import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  /**
   * Muestra un mensaje Toast con un botón de cierre
   * @param message Mensaje a mostrar
   * @param color Color del Toast (success, warning, danger, etc.)
   * @param duration Duración en milisegundos (por defecto 3000ms)
   * @param position Posición del Toast (top, middle, bottom)
   */
  async showToast(
    message: string,
    color: string = 'primary',
    duration: number = 3000,
    position: 'top' | 'middle' | 'bottom' = 'top',
  ) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message,
      duration,
      color,
      position,
      buttons: [
        {
          icon: 'close-outline', // Ícono de cierre
          role: 'cancel', // Cierra el toast automáticamente
          handler: () => {
            console.log('Toast cerrado manualmente.');
          }
        }
      ]
    });
    toast.present();
  }
}