import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {

  constructor(private apiSvc: ApiService) { }

  ngOnInit() {
  }

  upload(){
    let formData = new FormData();

    let el = (<HTMLInputElement>document.getElementById('csvFileInput'));
    console.log(el);
    console.log(el.files);
    if(el.files.length){
      formData.append('file', el.files[0], el.files[0].name);
      this.apiSvc.uploadCsvForImport(formData).then(res => console.log(res));
    }
  }

}
