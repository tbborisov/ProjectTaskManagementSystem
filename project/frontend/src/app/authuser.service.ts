import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {

  constructor() { }
     
  storeOnSessionStorageUserRole(username: string, role: string) {
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('role', role)
  }

  removeSeesionStorage(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
  }

  getSessionStorageRole(){
    return String(sessionStorage.getItem('role'));
  }

  getSessionStorageUsername(){
    return String(sessionStorage.getItem('username'));
  }

  isuserloggedin(){
    return (sessionStorage.getItem('role')==='A' || sessionStorage.getItem('role')==='U');
  }
}
