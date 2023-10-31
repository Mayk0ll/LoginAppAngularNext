import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.Interface';
import { UserService } from 'src/app/services/userServices';
import { errorFormService } from '../../services/errorFormService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public myForm: FormGroup = this.fb.group({
    username: ['',[Validators.required, Validators.minLength(6)],[]],
    password: ['',[Validators.required],[]]
  })

  // public myForm2 = new FormGroup({
  //   name: new FormControl('')
  // })

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

    this.myForm.markAllAsTouched();
    if(this.myForm.invalid) return;
    
    this.myForm.reset();

    // this.userService.signIn(this.myForm.value as User);
  }

}
