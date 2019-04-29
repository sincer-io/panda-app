import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ApiService } from 'src/app/services/api.service';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Category } from 'src/app/models/category';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Tag } from 'src/app/models/tag';
import { Person } from 'src/app/models/person';
import { Location } from 'src/app/models/location';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  title: string = 'Transaction';
  buttonLabel: string = 'Save Transaction';
  categories: Category[] = [{
    id: 1,
    name: 'Income'
  }];
  locations: Location[] = [];
  tags: Tag[] = [];
  people: Person[] = []


  @Input() transaction: Transaction = new Transaction();

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private tstCtrl: ToastController,
    private dataSvc: DataService,
    public alertCtr: AlertController,
    private route: ActivatedRoute
  ) { }

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

    /**
     * subscribe to params and check if we are editing/viewing or creating
     * otherwise re-init with new transaction values
     */
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.title = 'Transaction';
        this.buttonLabel = 'Update Transaction';
        this.dataSvc.transactions.subscribe(transactions => {
          let transaction = transactions.items.find(x => x.id == params['id']);
          if (transaction !== undefined) {
            this.transaction = JSON.parse(JSON.stringify(transaction));
            this.transaction.amount = this.transaction.amount < 0 ? -this.transaction.amount : this.transaction.amount;
          }
        });
      }
      else {
        this.title = 'New Transaction';
        this.buttonLabel = 'Save Transaction';
        this.transaction = new Transaction();
      }
    });
  }

  submitForm() {
    if (this.transaction.id) {
      this.apiSvc.putTransaction(this.transaction).then(res => {
        if (res.id) {
          // this.dataSvc.addTransaction(res);

          this.tstCtrl.create({
            message: "Transaction Updated",
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
    else {
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

  /**
   * Handles the addition of a new location
   * @param event Selectable Event
   */
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

  /**
   * Handles the addition of a new tag
   * @param event Selectable Event
   */
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

  /**
   * Handles the addition of a new person
   * @param event Selectable Event
   */
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

  /**
   * Opens a input prompt for a new value
   * @param modelName The name of the model
   * @param placeholder Input placeholder text
   * @param searchText Text from the search box to set as default
   * @param callback The callback to utilize on submission
   */
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
