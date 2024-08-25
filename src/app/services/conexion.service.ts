import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  status: boolean | undefined;
  // connectionType:string='';

  constructor(private alertController: AlertController) { }

  getNetworkStatus() {
    return new Promise((resolve) => {
    Network.getStatus().then(
      (status: ConnectionStatus) => {
        this.status = (status.connected);
    
          Network.addListener("networkStatusChange", (status: any) => {
            this.status = (status.connected);
            console.log('re', this.status);
            
          });
          if (this.status == false) {
    
            this.presentAlert()
          }

          resolve(status.connected);
           
        });
        
      });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Conexión',
      message: 'No tienes internet!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
