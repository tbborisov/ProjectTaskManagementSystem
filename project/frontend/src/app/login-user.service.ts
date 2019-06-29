import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { UserLogin } from './user-login';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(private http: HttpClient) { }

  getIfValidUser(loginName: string, password: string){
    return this.http.get<UserLogin>(`TaskProg/resources/userResources/validation/${loginName}/${password}`)
  }
}
