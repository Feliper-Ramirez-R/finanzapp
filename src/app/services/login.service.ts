import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { rutas } from 'src/env/rutas';




@Injectable({
  providedIn: 'root',
})
export class LoginService {

  token: any =  ''

  usuario: any = {};


  constructor(
    private http: HttpClient,
    private router: Router,
    public platform: Platform,
    private alertController: AlertController) {}



  async login(dataPost: any) {
  
    return new Promise((resolve) => {
      this.http.post(rutas.ruta + 'auth/login', dataPost).subscribe({
        next: (answer: any) => {
          this.token = answer.token
          this.guardarToken(answer['token']);
          resolve(answer);
        },
        error: async (error) => {
          console.log(<any>error);
          
          this.removePreferences();
          resolve(error);
        }
      });
    });
  }




  getUsuario() {
    return { ...this.usuario };
  }

  async guardarToken(token: string) {
    await Preferences.set({ key: 'token', value: token });
  }

  async traerToken() {
    this.token = (await Preferences.get({ key: 'token' })).value;
  }


  async validaToken(): Promise<any> {
    await this.traerToken()
    

    if (!this.token || this.token == null) {
      console.log('no hay token de ninguno');

      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      });

      this.http.get(rutas.ruta + 'auth/me', { headers }).subscribe({
        next: async (resp: any) => {
           console.log(resp)
          if (resp['user']) {
            this.usuario = resp['user'];
            if (resp['user'] == null || resp['user'] == undefined || !resp['user']) {
              this.removePreferences();
              this.router.navigate(['/login']);
            }

            resolve(true);
          } else {
            this.router.navigate(['/login']);
            resolve(false);
          }
            resolve(true);
        },
        error: async (error) => {
          console.log(<any>error);
          
          this.removePreferences();
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }

  logout() {

    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer' + this.token,
      });
      let dataPost = {
        token_ims: this.token,
      }

      console.log(dataPost);


      this.http.post(rutas.ruta+ 'auth/logout', dataPost, { headers }).subscribe({
        next: async (resp: any) => {
          this.usuario = {};
          console.log(resp, 'aca, aca');
          this.removePreferences();
          this.router.navigate(['/login']);
          resolve(true);
        },
        error: async (error) => {
          console.log(<any>error);
          
          this.router.navigate(['/login']);

          resolve(false);
        }
      });
    });
  }


  async removePreferences() {
    await Preferences.remove({ key: 'token' });
    await Preferences.clear();
  }

}