import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { RelationAnalytics } from 'src/app/models/relation-analytics';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  analytics: RelationAnalytics;

  constructor(private apiSvc: ApiService, private route: ActivatedRoute, private dataSvc: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.apiSvc.getCategoryAnalytics(params['id']).then(analytics => this.analytics = analytics).finally(() => {
          console.log(this.analytics);
        }); 
      }
    });
  }

}
