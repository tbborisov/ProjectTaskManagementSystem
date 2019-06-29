import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { UserLogin } from './user-login';
import { ThrowStmt } from '../../node_modules/@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
 
  constructor(private http: HttpClient) { }

  createUser(user: User){
    return this.http.post(`TaskProg/resources/userResources/createUser`, user);
  }

  getUsersFull(){
    return this.http.get<User[]>(`TaskProg/resources/userResources/getUserListFull`);
  }

  getUsersAssignFull(projectkey : string){
    return this.http.get<User[]>(`TaskProg/resources/userResources/getUserListAssignFull/${projectkey}`);
  }

  getUsersAssignFullAssigned(projectkey : string){
    return this.http.get<User[]>(`TaskProg/resources/userResources/getUserListAssignFullAssigned/${projectkey}`);
  }

  editUser(user: User){
    return this.http.post(`TaskProg/resources/userResources/editUser`, user);
  }

  deleteUser(username: string){
    return this.http.get(`TaskProg/resources/userResources/deleteUser/${username}`)
  }

  isUserWokringOnProject(username: string, projectKey: string){
    return this.http.get<boolean>(`TaskProg/resources/userResources/isUserWorkingOnProject/${username}/${projectKey}`);
  }
}
