import { Component, OnInit, Input } from '@angular/core';
import { Demarcation } from 'src/app/models/demarcation';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  @Input() demarcation: Demarcation = new Demarcation();


  constructor(private apiSvc: ApiService, private tstCtrl: ToastController) { }

  ngOnInit() {
  }

  generateNameField() {
    let { name, startDate, endDate } = this.demarcation;
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    if (name || !startDate || !endDate) {
      return false;
    }

    let start = new Date(startDate);
    let end = new Date(endDate);
    let start_month = monthNames[start.getMonth()];
    let end_month = monthNames[end.getMonth()];
    let start_year = start.getFullYear();
    let end_year = end.getFullYear();

    if (start_month === end_month && start_year === end_year) {
      this.demarcation.name = `${start_month} ${start_year}`;
    }
    else if (start_month !== end_month && start_year === end_year) {
      this.demarcation.name = `${start_month}/${end_month} ${start_year}`;
    }
  }

  async logForm() {
    this.apiSvc.postDemarcation(this.demarcation).then(res => {
      console.log(res);
    }).catch(err => {
      console.log('err');
      console.log(err)

      this.tstCtrl.create({
        message: err.error,
        duration: 2000
      }).then(toast => toast.present());

    });
  }

}
