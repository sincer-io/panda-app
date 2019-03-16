import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authSvc: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthed = this.authSvc.isAuthenticated();

    if (!isAuthed) {
      this.router.navigate(['/login']);
    }

    return isAuthed;
  }
}
