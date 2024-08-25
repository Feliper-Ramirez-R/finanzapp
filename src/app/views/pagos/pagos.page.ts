/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  datosBD = [
    { name: 'servicios ', checked: false },
    { name: 'Item 2', checked: false },
    { name: 'Item 3', checked: false },
  ];

  selectedItems: any[] = [];
  submitted:boolean = false;
  create:boolean = false;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
// Gusrda lo seleccionados en el check
/*   updateSelectedItems() {
    this.selectedItems = this.datosBD
      .filter(datosBD => datosBD.checked)
      .map(datosBD => datosBD.name);
  } */

  pagados(){
    console.log(this.selectedItems);
    
  }

  new(){
    this.create = true;
  }


  async alertCrearEditar() {

    const alert = await this.alertController.create({
      header: 'Eliminar el ingreso?',
      inputs:[
        {
          placeholder: 'Pago (max 25 caracteres)',
          attributes: {
            maxlength: 25,
          }
          },
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: (value) => {
            console.log(value);
            
          },
        },
      ],
    });

    await alert.present();

  }


  async alertPagar() {

    const alert = await this.alertController.create({
      header: 'Eliminar el ingreso?',
      inputs:[
        {
          placeholder: 'Pago (max 25 caracteres)',
          attributes: {
            maxlength: 25,
          }
          },
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: (value) => {
            console.log(value);
            
          },
        },
      ],
    });

    await alert.present();

  }

}
