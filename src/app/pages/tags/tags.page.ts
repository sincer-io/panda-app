import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
  tags: Tag[];

  constructor(private dataSvc: DataService, private apiSvc: ApiService, private navCtrl: NavController) { }

  ngOnInit() {
    this.dataSvc.tags.subscribe(tags => {
      this.tags = tags;
      if (!tags || tags.length === 0) {
        this.apiSvc.getTags();
      }
    });
  }

  viewTag(tagId: number) {
    this.navCtrl.navigateForward(`tags/${tagId}`);
  }
}
