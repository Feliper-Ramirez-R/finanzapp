import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  pwdIcon:string = "eye-outline";
  showPwd:boolean = false;
  submitted:boolean = false;

  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
      private user:LoginService,
      private alertas: AlertService,
      private router: Router
  ) { }

  

  togglePwd(): void {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-outline" : "eye-off-outline";
  }

  async login() {

    this.submitted = true;
      if (this.form.invalid) { this.form.markAllAsTouched(); return }

    let dataPost = {
      email:this.form.value.email,
      password:this.form.value.password,
    }

    console.log(dataPost);
    

    const valid: any = await this.user.login(dataPost);
    console.log(valid)

    if (!valid.error) {
      if (valid.status == 200) {
        this.router.navigate(['/tabs']);
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
