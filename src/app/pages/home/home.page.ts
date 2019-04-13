import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController, PopoverController, Events } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Chart } from 'chart.js';
import { BurndownEntry } from 'src/app/models/burndown-entry';
import { TimePeriodSelectionComponent } from 'src/app/components/time-period-selection/time-period-selection.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private apiSvc: ApiService, private navCtrl: NavController, private dataSvc: DataService, public popoverCtrl: PopoverController, private events: Events) { }
  
  balance: number = null;
  burndownEntries: BurndownEntry[] = [];
  days: number = 30;

  ngOnInit() {
    this.apiSvc.getBurndownEntries();

    this.dataSvc.burndownEntries.subscribe(entries => {
      if (entries && entries.length > -1) {
        this.burndownEntries = entries;
        this.initBurndownChart();
      }
    });

    this.dataSvc.balance.subscribe(balance => {
      this.balance = balance;
      if(!this.balance && balance !== 0){
        this.apiSvc.getBalance();
      }
    });

    this.events.subscribe("days:changed", (days: number) => {
      this.popoverCtrl.dismiss();
      this.days = days;
      this.apiSvc.getBurndownEntries(days);
    });
  }

  initBurndownChart() {
    var ctx = (<any>document.getElementById('canvas-chart')).getContext('2d');
    var chart = new Chart(ctx, {
      responsive: true,
      type: 'line',
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false
            }
          }]
        }
      },
      data: {
        labels: this.burndownEntries.map(e => e.date),
        datasets: [{
          steppedLine: true,
          backgroundColor: [
            'rgba(0, 0, 0, 0.1)',
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
          ],
          data: this.burndownEntries.map(e => e.total),
          borderWidth: 1
        }]
      }
    });
  }

  presentPopover(ev: any) {
    this.popoverCtrl.create({
      component: TimePeriodSelectionComponent,
      event: ev,
      translucent: true
    }).then((popover) => {
      popover.present();
    });
  }


}
