import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public platePattern: string = '[a-zA-Z]{3}[0-9]{2}[a-zA-Z0-9]';

  public isValidField(form: FormGroup, field:string) {
  
     return form.controls[field].errors && form.controls[field].touched;
  }


  public getFieldErrorPlate(form: FormGroup, field:string):string | null {
    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
    
      switch(key){
        case 'required': 
        return 'El campo es requerido';

        case 'pattern':
          return 'placa no valida'
      }
    }
    return null;
  }


  public getFieldErrorName(form: FormGroup, field:string):string | null {
    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
    
      switch(key){
        case 'required': 
        return 'El campo es requerido';

        case 'pattern':
          return 'Debes escribir nombre y apellido'
      }
    }
    return null;
  }

  
}
