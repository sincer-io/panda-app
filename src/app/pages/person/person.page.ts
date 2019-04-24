import { Component, OnInit } from '@angular/core';
import { RelationAnalytics } from 'src/app/models/relation-analytics';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  analytics: RelationAnalytics;

  constructor(private apiSvc: ApiService, private route: ActivatedRoute, private dataSvc: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.apiSvc.getPersonAnalytics(params['id']).then(analytics => this.analytics = analytics).finally(() => {
          console.log(this.analytics);
        });
      }``
    });
  }
}
