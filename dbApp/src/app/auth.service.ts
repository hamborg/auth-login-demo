import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; // for at få Post og Get

@Injectable({
  providedIn: 'root' // Dette er ikke med i tutorialen
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register' // Link til vores backend, der kører på anden port
  private _loginUrl = 'http://localhost:3000/api/login' // Link til vores backend, der kører på anden port

  constructor(private http: HttpClient) { } // Modulet bliver 'injected' ind i 

  registerUserService(user) {
    return this.http.post<any>(this._registerUrl, user)
    // NOTE: Husk at tjekke om bruger findes osv.
  }

  loginUserService(user){ // user er det indtastede bruger-data
    return this.http.post<any>(this._loginUrl, user)
    // Jeg ved ikke hvorfor login er Post-method
  }
  logoutUserService(){ // user er det indtastede bruger-data
    localStorage.removeItem('token')
    // Her kan man lave en router.navigate. Men det har jeg skrevet i html.
  }

  loggedIn(){ // Tjekker om user er logget ind eller ej. (False or True?)
    return !!localStorage.getItem('token')
  }

  getToken(){ // Henter 'token' fra localStorage. Kan bruges i token-interceptor
    return localStorage.getItem('token')
  }
}
