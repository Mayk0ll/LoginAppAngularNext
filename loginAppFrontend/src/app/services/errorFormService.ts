import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class errorFormService {
  constructor() { }

  isValidField(myForm: FormGroup, field: string): boolean | null{
    return myForm.controls[field].errors && myForm.controls[field].touched
  }

  getFieldError(myForm: FormGroup, field: string): string | null{
    if(!myForm.controls[field].errors) return null;

    const errors = myForm.controls[field].errors || {}

    for(let err of  Object.keys(errors)){
      switch(err){
        case 'required':
          return 'Este campo es obligatorio'

        case 'minlength':
          return `Usuario muy corto, minimo ${errors['minlength'].requiredLength} caracteres`
      }
    }

    return null;
  }

}
