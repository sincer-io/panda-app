import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ApiService } from 'src/app/services/api.service';
import { ToastController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Tag } from 'src/app/models/tag';
import { Person } from 'src/app/models/person';
import { Location } from 'src/app/models/location';

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
  locations: Location[] = [];
  tags: Tag[] = [];
  people: Person[] = []


  @Input() transaction: Transaction = new Transaction();

  constructor(private apiSvc: ApiService, private tstCtrl: ToastController, private dataSvc: DataService, private router: Router, public alertCtr: AlertController) { }

  ngOnInit() {
    this.dataSvc.categories.subscribe(categories => {
      let cats = categories.filter(x => x.name !== 'Income');
      this.categories = [...this.categories, ...cats];
    });

    if (this.categories.length <= 1) {
      this.apiSvc.getCategories();
    }
  }

  logForm() {
    console.log(this.transaction);

    this.apiSvc.postTransaction(this.transaction).then(res => {
      console.log(res);
      // event.component.search(res.name);
      // this.tags.push(res);
    }).catch(err => {
      this.tstCtrl.create({
        message: err.error,
        duration: 2000
      }).then(toast => toast.present());
    });
  }

  categoryChange(event: { component: IonicSelectableComponent, value: Category }) {
    this.transaction.category = event.value;
  }

  locationChange(event: { component: IonicSelectableComponent, value: Location }) {
    this.transaction.location = event.value;
  }

  tagsChange(event: { component: IonicSelectableComponent, value: Tag[] }) {
    this.transaction.tags = event.value;
  }

  peopleChange(event: { component: IonicSelectableComponent, value: Person[] }) {
    this.transaction.people = event.value;
  }

  /**
   * Handles addition of a new category
   * @param event Selectable Event
   */
  onAddCategory(event: { component: IonicSelectableComponent }) {
    this.newValuePrompt("Category", "Groceries", event.component.searchText, (e) => {
      event.component.showLoading();
      let newCategory: Category = {
        id: 0,
        name: e.textValue
      }

      this.apiSvc.postCategory(newCategory).then(res => {
        event.component.search(res.name);
        this.categories.push(res);
      }).catch(err => {
        this.tstCtrl.create({
          message: err.error,
          duration: 2000
        }).then(toast => toast.present());
      }).finally(() => {
        event.component.hideLoading();
      });
    });
  }

  onAddLocation(event: { component: IonicSelectableComponent }) {
    this.newValuePrompt("Location", "69 Backend Alley", event.component.searchText, (e) => {
      event.component.showLoading();
      let newLocation: Location = {
        id: 0,
        name: e.textValue
      }

      this.apiSvc.postLocation(newLocation).then(res => {
        event.component.search(res.name);
        this.locations.push(res);
      }).catch(err => {
        this.tstCtrl.create({
          message: err.error,
          duration: 2000
        }).then(toast => toast.present());
      }).finally(() => {
        event.component.hideLoading();
      });
    });
  }

  onAddTag(event: { component: IonicSelectableComponent }) {
    this.newValuePrompt("Tag", "Birthday", event.component.searchText, (e) => {
      event.component.showLoading();
      let newTag: Tag = {
        id: 0,
        name: e.textValue
      }

      this.apiSvc.postTag(newTag).then(res => {
        event.component.search(res.name);
        this.tags.push(res);
      }).catch(err => {
        this.tstCtrl.create({
          message: err.error,
          duration: 2000
        }).then(toast => toast.present());
      }).finally(() => {
        event.component.hideLoading();
      });
    });
  }

  onAddPerson(event: { component: IonicSelectableComponent }) {
    this.newValuePrompt("Person", "Jacob Fire", event.component.searchText, (e) => {
      event.component.showLoading();
      let newPerson: Person = {
        id: 0,
        name: e.textValue
      }

      this.apiSvc.postPerson(newPerson).then(res => {
        event.component.search(res.name);
        this.people.push(res);
      }).catch(err => {
        this.tstCtrl.create({
          message: err.error,
          duration: 2000
        }).then(toast => toast.present());
      }).finally(() => {
        event.component.hideLoading();
      });
    });
  }

  private newValuePrompt(modelName: string, placeholder: string, searchText: string, callback) {
    this.alertCtr.create({
      header: `New ${modelName}`,
      inputs: [
        {
          name: 'textValue',
          type: 'text',
          placeholder: placeholder,
          value: searchText
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
          handler: callback
        }
      ]
    }).then(alert => alert.present());
  }

}
