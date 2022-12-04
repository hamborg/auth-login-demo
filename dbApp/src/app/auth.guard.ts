import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _auth: AuthService,
    private _router: Router ) {}
  
  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    // ^^^ Overstående er default
  ): boolean { // Hvis den er sat til Boolean, SKAL den returnere enten True eller False
    if (this._auth.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
  
}
