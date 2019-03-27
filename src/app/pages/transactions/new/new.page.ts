import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ApiService } from 'src/app/services/api.service';
import { ToastController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  categories: Category[] = [{
    id: 1,
    name: 'Income'
  }];

  @Input() transaction: Transaction = new Transaction();

  constructor(private apiSvc: ApiService, private tstCtrl: ToastController, private dataSvc: DataService, private router: Router, public alertCtr: AlertController) { }

  ngOnInit() { }

  logForm() {
    console.log(this.transaction);
  }

  categoryChange(event: { component: IonicSelectableComponent, value: Category }) {
    this.transaction.category = event.value;
  }

  /**
   * Handles addition of a new category
   * @param event Selectable Event
   */
  onAddCategory(event: { component: IonicSelectableComponent }) {
    this.alertCtr.create({
      header: 'New Category',
      inputs: [
        {
          name: 'categoryName',
          type: 'text',
          placeholder: 'Groceries',
          value: event.component.searchText
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (e) => {
            event.component.showLoading();
            let newCategory: Category = {
              id: 0,
              name: e.categoryName
            }

            this.apiSvc.postCategory(newCategory).then(res => {
              this.categories.push(res);
              event.component.search(res.name);
            }).catch(err => {
              this.tstCtrl.create({
                message: err.error,
                duration: 2000
              }).then(toast => toast.present());
            }).finally(() => {
              event.component.hideLoading();
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
