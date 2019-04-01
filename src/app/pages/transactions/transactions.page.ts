import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Transaction } from 'src/app/models/transaction';
import { TransactionGroup } from 'src/app/models/transaction-group';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  private groupedTransactions: TransactionGroup[] = [];
  private transactions: Transaction[];

  constructor(private apiSvc: ApiService, private navCtrl: NavController, private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.transactions.subscribe(transactions => {
      if (!this.transactions) {
        this.apiSvc.getTransactions();
      }

      this.transactions = transactions;
      this.groupedTransactions = [];

      for (let i = 0; i < this.transactions.length; i++) {
        const element = this.transactions[i];
        const date = element.date.substring(0, 10);

        let index = this.groupedTransactions.findIndex((t) => t.date == date );
        if(index !== -1){
          this.groupedTransactions[index].transactions.push(element);
        }
        else{
          let trans = new TransactionGroup();
          trans.date = date;
          trans.transactions = [element];
          this.groupedTransactions.push(trans);
        }
      }
    });
  }

  newTransaction() {
    this.navCtrl.navigateForward('transactions/new');
  }

}
