import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  locations: Location[];

  constructor(private dataSvc: DataService, private apiSvc: ApiService, private navCtrl: NavController) { }

  ngOnInit() {
    this.dataSvc.locations.subscribe(locations => {
      this.locations = locations;
      if(!locations || locations.length === 0){
        this.apiSvc.getLocations();
      }
    });
  }

  viewLocation(locationId: number){
    this.navCtrl.navigateForward(`locations/${locationId}`);
  }
}
