import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/models/category';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  private categories: Category[];

  constructor(private dataSvc: DataService, private apiSvc: ApiService, private navCtrl: NavController) { }

  ngOnInit() {
    this.dataSvc.categories.subscribe(categories => {
      this.categories = categories;
      if(!categories || categories.length <= 0){
        this.apiSvc.getCategories();
      }
    });
  }

  viewCategory(categoryId: number){
    this.navCtrl.navigateForward(`categories/${categoryId}`);
  }
}
