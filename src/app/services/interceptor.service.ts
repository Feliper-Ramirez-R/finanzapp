import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConexionService } from './conexion.service';
import { SpinnerService } from './spinner.service';
import { rutas } from 'src/env/rutas';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  status: any;

  constructor(
    private spinnerService: SpinnerService,
    private conexion: ConexionService /* && req.url != this.rutas.ruta+'auth/getVersion' */
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (
      this.conexion.status
    ) {
       this.spinnerService.empezar();
    }

    return next.handle(req).pipe(
      finalize(async () => {
        await this.spinnerService.terminar();
      })
    );
  }
}
