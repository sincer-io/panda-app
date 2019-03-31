import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Transaction } from 'src/app/models/transaction';
import { GroupedTransactions } from 'src/app/models/grouped-transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  private groupedTransactions: GroupedTransactions[];

  constructor(private apiSvc: ApiService, private navCtrl: NavController, private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.transactions.subscribe(groupedTransactions => {
      if (!this.groupedTransactions) {
        this.apiSvc.getTransactions();
      }

      this.groupedTransactions = groupedTransactions;
    });
  }

  newTransaction() {
    this.navCtrl.navigateForward('transactions/new');
  }

}
