import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { rutas } from '../../env/rutas';

@Injectable({
  providedIn: 'root'
})
export class Tab3Service {

  constructor(private login: LoginService,
    private http: HttpClient,
    private alertas: AlertService,
    private router: Router) { }

  getIngresos() {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.login.token,
      });
     
      this.http.get(`${rutas.ruta}income`,{ headers }).subscribe({
        next: (answer) => {
          resolve(answer);
        },
        error: async (error) => {
          if (error.status == 401) { this.alertas.alertMensaje('Tu sesión espiró, inicia de nuevo'); this.router.navigate(['/login']) }
          resolve(error);
        }
      });
    });
  }

  saveItem(dataPost:any) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.login.token,
      });

      this.http.post(`${rutas.ruta}income`,dataPost,{ headers }).subscribe({
        next: (answer) => {
          resolve(answer);
        },
        error: async (error) => {
          if (error.status == 401) { this.alertas.alertMensaje('Tu sesión espiró, inicia de nuevo'); this.router.navigate(['/login']); return }
          resolve(error);
        }
      });
    });
  }

  editItem(dataPost:any,id:any) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.login.token,
      });

      this.http.patch(`${rutas.ruta}income/${id}`,dataPost,{ headers }).subscribe({
        next: (answer) => {
          resolve(answer);
        },
        error: async (error) => {
          if (error.status == 401) { this.alertas.alertMensaje('Tu sesión espiró, inicia de nuevo'); this.router.navigate(['/login']); return }
          resolve(error);
        }
      });
    });
  }

  deleteItem(id:any) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.login.token,
      });

      this.http.delete(`${rutas.ruta}income/${id}`,{ headers }).subscribe({
        next: (answer) => {
          resolve(answer);
        },
        error: async (error) => {
          if (error.status == 401) { this.alertas.alertMensaje('Tu sesión espiró, inicia de nuevo'); this.router.navigate(['/login']); return }
          resolve(error);
        }
      });
    });
  }

}
