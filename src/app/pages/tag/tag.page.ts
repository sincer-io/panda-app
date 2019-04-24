import { Component, OnInit } from '@angular/core';
import { RelationAnalytics } from 'src/app/models/relation-analytics';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.page.html',
  styleUrls: ['./tag.page.scss'],
})
export class TagPage implements OnInit {

  analytics: RelationAnalytics;

  constructor(private apiSvc: ApiService, private route: ActivatedRoute, private dataSvc: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.apiSvc.getTagAnalytics(params['id']).then(analytics => this.analytics = analytics).finally(() => {
          console.log(this.analytics);
        });
      }
    });
  }
}
