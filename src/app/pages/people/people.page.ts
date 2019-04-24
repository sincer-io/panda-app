import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  people: Person[];

  constructor(private dataSvc: DataService, private apiSvc: ApiService, private navCtrl: NavController) { }

  ngOnInit() {
    this.dataSvc.people.subscribe(people => {
      this.people = people;
      if(!people || people.length === 0){
        this.apiSvc.getPeople();
      }
    });
  }

  viewPerson(personId: number){
    this.navCtrl.navigateForward(`people/${personId}`);
  }
}
