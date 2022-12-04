import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

// import { Injector } from '@angular/core'; // *** HACK
import { AuthService } from "./auth.service";
//////// NOTE:
// Iflg. videoen (fra 2018), virker det ikke helt at injecte, service direkte i Constructor, som normalt. "Det burde være fikset i senere versioner af Angular"
// Derfor bruger vi et hack til at hente den. Dette via 'Injector', som bruges direkte i method.
//////// DET LADER DOG TIL AT VIRKE FINT I MIN VERSION!!! Vær opmærksom, hvis der opstår fejl.

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor { // jeg har ikke helt forstået, hvad 'implements' gør...
  // "Ved at 'implementere' httpIntercept, bliver vi nødt til at definere en 'intercept' method"

  constructor(private auth: AuthService) { }
  // constructor(private injector: Injector) { } // *** HACK: injector til at hente AuthService. Virker.

  intercept(req, next) { // Den method der var krævet af 'implements'(??). Det lader til, at den er kendt i forvejen.. (Ikke vores navngivning)
    // let authService = this.injector.get(AuthService) // *** HACK: Hent AuthService uden constructor. Virker fint.
    
    let tokenizedReq = req.clone({ // Vi laver en klon af request. Til den, sættes autherization-information til 'header'. Denne sendes videre senere.
      setHeaders: {
        Autherization: `Bearer ${this.auth.getToken()}` // En 'bearer'-token med token-value bagefter. "xx.yy.zz" burde være nok til at teste interceptionen
        // Autherization: `Bearer ${authService.getToken()}` // *** HACK: Hent token fra AuthService. Virker. En 'bearer'-token med token-value bagefter. "xx.yy.zz" burde være nok til at teste interceptionen
      }
    })
    return next.handle(tokenizedReq)
  }

}
