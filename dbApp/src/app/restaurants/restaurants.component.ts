import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  rests =[]
  constructor(private _eventsService: EventService,
              private _router: Router) { }

  ngOnInit() {
    this._eventsService.getRests()
      .subscribe(
        res => this.rests = res,
        // err => console.log(err)
        err => {
          if (err instanceof HttpErrorResponse) { // Type respons, som kommer ved forkert login
            if (err.status === 401) { // 'status' er element i 'err' object. Kan ses ved logge til console.
              this._router.navigate(['/login']) // Vi sender til login, hvis det fejler.
            }
          }

        }
      )
  }

}
