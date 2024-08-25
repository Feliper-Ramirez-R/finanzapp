import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private user:LoginService){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
   /*  console.log(route.url[0].path);
    console.log(this.user.validaToken()); */
    
    return  this.user.validaToken() ;
  }
  
}
