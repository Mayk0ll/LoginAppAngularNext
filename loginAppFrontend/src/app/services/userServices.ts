import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { User } from '../interfaces/user.Interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

  private myAppUrl: string = enviroment.url;

  constructor(private http: HttpClient) { }


  signIn(user: User):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}/user`, user);
  }

}

