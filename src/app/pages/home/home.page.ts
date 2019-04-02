import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Chart } from 'chart.js';
import { BurndownEntry } from 'src/app/models/burndown-entry';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private apiSvc: ApiService, private navCtrl: NavController, private dataSvc: DataService) { }
  
  balance: number = null;
  burndownEntries: BurndownEntry[] = [];

  ngOnInit() {
    this.apiSvc.getBurndownEntries();

    this.dataSvc.burndownEntries.subscribe(entries => {
      if (entries && entries.length > 0) {
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
}
