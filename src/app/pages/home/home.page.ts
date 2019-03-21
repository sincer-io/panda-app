import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private apiSvc: ApiService, private navCtrl: NavController, private dataSvc: DataService) { }

  ngOnInit(){
    this.apiSvc.getFuck().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
}
  