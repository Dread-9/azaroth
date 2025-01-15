import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) {}

  async presentLoading(message: string = 'Cargando...', duration: number = 0) {
    const loading = await this.loadingController.create({
      message,
      mode:'ios',
      duration,
      spinner: 'circles',
    });
    await loading.present();
  }
  
  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}
