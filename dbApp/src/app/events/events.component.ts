import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events =[]
  hejs = ["hej", "jamen hej", "hej hej??", "så hejhej da!", "og også hej til dig", "ja selv hej", "og haj?!?", "åh! hej haj?!", "Det var et haj-hej"]
  constructor(private _eventsService: EventService) { }

  ngOnInit() {
    // Vi subscriber til vores observable-service i OnInit, fordi det skal ske, når siden åbener.
    // Vi tilføjerer events fra servicen til vores array ovenfor.

    this._eventsService.getEvents()
      .subscribe(
        res => {this.events = res
        console.log(res)},
        err => {console.log("error sker!")
        console.log(err)}
      )
  }

}
