import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events"
  private _restsUrl = "http://localhost:3000/api/restaurants"

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<any>(this._eventsUrl)
    // returnerer data som Observable, så de skal subscribes til i componenten.
  }
  
  getRests(){
    return this.http.get<any>(this._restsUrl)
    // returnerer data som Observable, så de skal subscribes til i componenten.
  }
}
