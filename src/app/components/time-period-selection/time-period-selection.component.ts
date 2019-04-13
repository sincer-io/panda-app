import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-time-period-selection',
  templateUrl: './time-period-selection.component.html',
  styleUrls: ['./time-period-selection.component.scss'],
})
export class TimePeriodSelectionComponent implements OnInit {

  constructor(private events: Events) { }

  ngOnInit() {}

  setDays(days: number){
    this.events.publish("days:changed", days);
  }
}
