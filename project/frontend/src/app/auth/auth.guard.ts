import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthuserService } from '../authuser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userauth: AuthuserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userauth.isuserloggedin()) { return true; }

    this.router.navigate(['']);
    return false;
  }
}
