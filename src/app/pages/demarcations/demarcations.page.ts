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
    this.dataSvc.demarcations.subscribe(demarcations => {
      if(!demarcations || demarcations.length <= 0){
        this.apiSvc.getDemarcations();
      }

      this.demarcations = demarcations;
    });
  }

  newDemarcation() {
    this.navCtrl.navigateForward('demarcations/new');
  }

}
