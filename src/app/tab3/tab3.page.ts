import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tab3Service } from './tab3.service';
import { AlertService } from '../services/alert.service';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ValidatorsService } from '../services/validators.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild(IonModal) modal: any;

  types: any = [];
  datosBD: any = [];
  submitted: boolean = false;
  crear: boolean = false;
  openModal: boolean = false;
  item: any = {};

  form: FormGroup = this.fb.group({
    type: ['', Validators.required],
    amount: ['', Validators.required],
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
    private tab3Service: Tab3Service,
    private alertas: AlertService,
    private validatorService: ValidatorsService,
    private user: LoginService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getIngresos();
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.form, field)
  }

  edit(item: any) {
    this.item = item;
    item.type = item.type_id
    console.log(item);
    this.crear = false;
    this.form = this.fb.group(item);
    this.openModal = true;
  }

  async delete(item: any) {

    this.item = item;


    const alert = await this.alertController.create({
      header: 'Eliminar el ingreso?',
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
          handler: () => {
            this.deleteItem();
          },
        },
      ],
    });

    await alert.present();

  }

  newItem() {
    this.crear = true;
    this.form.reset();
    this.openModal = true;
  }

  cancel() {
    this.openModal = false;
  }


  confirm() {
    this.submitted = true;
    if (this.form.invalid) { this.form.markAllAsTouched(); return }
    if (this.crear) { this.saveItem(); } else { this.editItem() }
  }

  async getIngresos() {

    const valid: any = await this.tab3Service.getIngresos();
    console.log(valid);

    if (!valid.error) {
      this.types = valid.types;
      this.datosBD = valid.data;
      if (valid.status == 201) {
        
      } else {

        // this.alertas.alertMensaje(valid.message);
        return
      }
    } else {
      if (valid.status != 500) { return this.alertas.alertMensaje(valid.error.message); }
      else { this.alertas.alertMensaje('Ocurrió un error'); }
    }
  }

  async saveItem() {

    console.log(this.form);


    let dataPost = {
      name: this.form.value.name,
      type: this.form.value.type,
      amount: this.form.value.amount,
      enabled: true,
      // byUser:this.user.user.id
      byUser: 1
    }

    const valid: any = await this.tab3Service.saveItem(dataPost);
    console.log(valid)

    if (!valid.error) {
      if (valid.status == 201) {
        this.alertas.alertMensaje(valid.message);
        this.getIngresos();
        this.openModal = false;
      } else {
        this.alertas.alertMensaje(valid.message);
        return
      }
    } else {
      if (valid.status != 500) { return this.alertas.alertMensaje(valid.error.message); }
      else { this.alertas.alertMensaje('Ocurrió un error'); }
    }
  }


  async editItem() {


    let dataPost = {
      name: this.form.value.name,
      type: this.form.value.type,
      amount: this.form.value.amount,
      enabled: true,
      // byUser:this.user.user.id
      byUser: 1
    }

    const valid: any = await this.tab3Service.editItem(dataPost, this.item.id);
    console.log(valid)

    if (!valid.error) {
      if (valid.status == 201) {
        this.alertas.alertMensaje(valid.message);
        this.getIngresos();
        this.openModal = false;
      } else {
        this.alertas.alertMensaje(valid.message);
        return
      }
    } else {
      if (valid.status != 500) { return this.alertas.alertMensaje(valid.error.message); }
      else { this.alertas.alertMensaje('Ocurrió un error'); }
    }
  }


  async deleteItem() {

    const valid: any = await this.tab3Service.deleteItem(this.item.id);
    console.log(valid)

    if (!valid.error) {
      if (valid.status == 200) {
        this.alertas.alertMensaje(valid.message);
        this.getIngresos();
        this.openModal = false;
      } else {
        this.alertas.alertMensaje(valid.message);
        return
      }
    } else {
      if (valid.status != 500) { return this.alertas.alertMensaje(valid.error.message); }
      else { this.alertas.alertMensaje('Ocurrió un error'); }
    }
  }

}
