import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
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

  constructor(private apiSvc: ApiService, private tstCtrl: ToastController, private dataSvc: DataService, private router: Router) { }

  ngOnInit() { }

  logForm() {
    console.log(this.transaction);
  }

  categoryChange(event: { component: IonicSelectableComponent, value: Category }) {
    this.transaction.category = event.value;
  }

}
