import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent,
    canActivate: [AuthGuard]  // AuthGuard indeholder en 'canActivate' function der giver true/false hvis vi er logget ind.
  },
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
