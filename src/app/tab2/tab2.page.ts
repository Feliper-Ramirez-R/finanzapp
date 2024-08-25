import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { Tab2Service } from './tab2.service';
import { AlertService } from '../services/alert.service';
import { ValidatorsService } from '../services/validators.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonModal) modal: any;

  types: any = [];
  datosBD: any = [];
  submitted: boolean = false;
  crear: boolean = false;
  openModal: boolean = false;
  item: any = {};

  form: FormGroup = this.fb.group({
    date: [''],
    amount: ['', Validators.required],
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
    private tab2Service: Tab2Service,
    private alertas: AlertService,
    private validatorService: ValidatorsService,
    private user: LoginService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getEgresos();
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.form, field)
  }

  edit(item: any) {
    this.item = item;
    console.log(item);
    this.crear = false;
    this.form = this.fb.group(item);
    this.openModal = true;
  }

  async delete(item: any) {

    this.item = item;


    const alert = await this.alertController.create({
      header: 'Eliminar el egreso?',
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
    this.openModal = false
  }


  confirm() {
    this.submitted = true;
    if (this.form.invalid) { this.form.markAllAsTouched(); return }
    if (this.crear) { this.saveItem(); } else { this.editItem() }
  }

  async getEgresos() {

    const valid: any = await this.tab2Service.getEgresos();
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

    if (!this.form.value.date) { this.form.value.date = new Date().toISOString() }

    let dataPost = {
      name: this.form.value.name,
      date: this.form.value.date,
      amount: this.form.value.amount,
      byUser: this.user.usuario.id
    }

    console.log(dataPost);


    const valid: any = await this.tab2Service.saveItem(dataPost);
    console.log(valid)

    if (!valid.error) {
      if (valid.status == 201) {
        this.alertas.alertMensaje(valid.message);
        this.getEgresos();
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
      date: this.form.value.date,
      amount: this.form.value.amount,
      byUser: this.user.usuario.id
    }

    const valid: any = await this.tab2Service.editItem(dataPost, this.item.id);
    console.log(valid)

    if (!valid.error) {
      if (valid.status == 201) {
        this.alertas.alertMensaje(valid.message);
        this.getEgresos();
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

    const valid: any = await this.tab2Service.deleteItem(this.item.id);
    console.log(valid)

    if (!valid.error) {
      if (valid.status == 200) {
        this.alertas.alertMensaje(valid.message);
        this.getEgresos();
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
