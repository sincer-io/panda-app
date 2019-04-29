import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Transaction } from 'src/app/models/transaction';
import { TransactionGroup } from 'src/app/models/transaction-group';
import { PaginatedContent } from 'src/app/models/paginated-content';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  groupedTransactions: TransactionGroup[] = [];
  private transactions: PaginatedContent<Transaction>;

  constructor(private apiSvc: ApiService, private navCtrl: NavController, private dataSvc: DataService, public alertCtr: AlertController) { }

  ngOnInit() {
    this.dataSvc.transactions.subscribe(transactions => {
      if (!this.transactions) {
        this.apiSvc.getTransactions();
      }

      this.transactions = transactions;
      this.buildGroupedTransactionData();
    });
  }

  paginate(event){
    this.apiSvc.getTransactions(this.transactions.page + 1).then(res => {
      event.target.complete();
      if(res.page >= res.totalPages){
        event.target.disabled = true;
      }
    });
  }

  buildGroupedTransactionData(){
    for (let i = 0; i < this.transactions.items.length; i++) {
      const element = this.transactions.items[i];
      const date = element.date.substring(0, 10);

      let index = this.groupedTransactions.findIndex((t) => t.date == date);
      if (index !== -1) {
        if(this.groupedTransactions[index].transactions.findIndex((t) => t.id == element.id) === -1){
          this.groupedTransactions[index].transactions.push(element);
        }
      }
      else {
        let trans = new TransactionGroup();
        trans.date = date;
        trans.transactions = [element];
        this.groupedTransactions.push(trans);
      }
    }
  }

  newTransaction() {
    this.navCtrl.navigateForward('transactions/new');
  }

  viewTransaction(transactionId: number){
    this.navCtrl.navigateForward(`transactions/${transactionId}`);
  }

  deleteTransaction(transactionId: number) {
    console.log(transactionId);
    this.alertCtr.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this transaction?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.apiSvc.deleteTransaction(transactionId).then(() => {
              this.dataSvc.removeTransaction(transactionId);
            }).catch(err => {
              console.log(err);
            })
          }
        }
      ]
    }).then(confirm => confirm.present());

  }

}
