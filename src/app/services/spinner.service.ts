import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  loading: HTMLIonLoadingElement | undefined;

  constructor(private loadingCtrl: LoadingController) {}

  /*  empezar(){
    this.loadingCtrl.create({
      spinner: 'circular',
      translucent: true,
      message:'Espere...'
    }).then( (loading) =>{
       loading.present()
    })
  }

  terminar(){
    this.loadingCtrl.getTop().then(async hasLoading => {
      hasLoading?.dismiss();
  })
  } */

  async empezar() {
    if (this.loading) {
      return;
    }

    this.loading = await this.loadingCtrl.create({
      message: 'Espere...',
    });

    await this.loading.present();
  }

  terminar() {
    this.loading?.dismiss();
    this.loading = undefined;
  }
}
