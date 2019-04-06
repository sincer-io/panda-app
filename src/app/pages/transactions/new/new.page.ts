import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ApiService } from 'src/app/services/api.service';
import { ToastController, AlertController, NavController } from '@ionic/angular';
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

  constructor(private apiSvc: ApiService, private navCtrl: NavController, private tstCtrl: ToastController, private dataSvc: DataService, private router: Router, public alertCtr: AlertController) { }

  ngOnInit() {
    this.dataSvc.categories.subscribe(categories => {
      let cats = categories.filter(x => x.name !== 'Income');
      this.categories = [...this.categories, ...cats];
    });
    if (this.categories.length <= 1) {
      this.apiSvc.getCategories();
    }

    this.dataSvc.locations.subscribe(locations => this.locations = locations);
    if (this.locations.length <= 1) {
      this.apiSvc.getLocations();
    }

    this.dataSvc.tags.subscribe(tags => this.tags = tags);
    if (this.tags.length <= 1) {
      this.apiSvc.getTags();
    }

    this.dataSvc.people.subscribe(people => this.people = people);
    if (this.people.length <= 1) {
      this.apiSvc.getPeople();
    }
  }

  logForm() {
    console.log(this.transaction);

    this.apiSvc.postTransaction(this.transaction).then(res => {
      console.log(res);
      if (res.id) {
        this.dataSvc.addTransaction(res);

        this.transaction.amount = null;
        this.transaction.category = null;
        this.transaction.location = null;
        this.transaction.tags = null;
        this.transaction.people = null;
        this.transaction.isExtraneous = false;
        this.transaction.label = null;
        this.transaction.notes = null;

        this.tstCtrl.create({
          message: "Transaction Added",
          duration: 2000,
          showCloseButton: true,
          closeButtonText: "View Transactions",
          keyboardClose: true,
        }).then(toast => {
          toast.present();
          toast.onDidDismiss().then((e) => {
            if (e.role == 'cancel') {
              this.navCtrl.navigateForward('transactions');
            }
          })
        });
      }
    }).catch(err => {
      this.tstCtrl.create({
        message: err.error,
        duration: 2000
      }).then(toast => toast.present());
    });
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
