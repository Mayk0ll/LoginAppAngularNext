import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { errorFormService } from 'src/app/services/errorFormService';
import { UserService } from 'src/app/services/userServices';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public myForm = this.fb.group({
    username: ['',[Validators.required],[]],
    password: ['',[Validators.required],[]],
    password2: ['',[Validators.required],[]]
  })

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private errorFormService:errorFormService,
  ){}

  isValidField(field: string): boolean | null{
    return this.errorFormService.isValidField(this.myForm, field)
  }

  getFieldError(field: string): string | null{
    return this.errorFormService.getFieldError(this.myForm, field)
  }

  onSubmit(){

    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid) return;


  }

}
