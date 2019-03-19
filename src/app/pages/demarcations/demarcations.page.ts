import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Demarcation } from 'src/app/models/demarcation';

@Component({
  selector: 'app-demarcations',
  templateUrl: './demarcations.page.html',
  styleUrls: ['./demarcations.page.scss'],
})
export class DemarcationsPage implements OnInit {
  private demarcations: Demarcation[];

  constructor(private apiSvc: ApiService, private navCtrl: NavController, private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.demarcations.subscribe(demarcations => this.demarcations = demarcations);
    this.getDemarcations();
  }

  getDemarcations() {
    this.apiSvc.getDemarcations();
  }

  newDemarcation() {
    console.log('nav time')
    this.navCtrl.navigateForward('demarcations/new');
  }

}
