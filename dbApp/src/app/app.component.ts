import { Component } from '@angular/core';
import { AuthService } from './auth.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dbApp';

  constructor(private _authService: AuthService){} // constructor var ikke en del af app.component før. Kun brugt til at 'injecte' authservice.
}
