import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController:AlertController,private router:Router) { }

 
  /************************************************************** */
   /*************Alert Mensajes ***********************/

   async alertMensaje(mensaje:any){
    const alert = await this.alertController.create({
      backdropDismiss:false,
      message:mensaje,
      header:'Info',
      buttons:['Ok']  
    })
    await alert.present();
   }

   async alertMensajeheader(mensaje:any,subHeader:any){
    const alert = await this.alertController.create({
      backdropDismiss:false,
      message:mensaje,
      header:'Info',
      subHeader: subHeader,
      buttons:['Ok']  
    })
    await alert.present();
   }

   async alertMensajeError(mensaje:any){
    const alert = await this.alertController.create({
      backdropDismiss:false,
      message:mensaje,
      header:'Error',
      buttons:['Ok']  
    })
    await alert.present();
   }

}


