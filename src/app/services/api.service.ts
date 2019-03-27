import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenDetail } from '../models/token-detail';
import { User } from '../models/user';
import { DataService } from './data.service';
import { Demarcation } from '../models/demarcation';
import { Transaction } from '../models/transaction';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.api_endpoint;

  constructor(private http: HttpClient, private dataSvc: DataService) { }

  /**
   * Post to the API to retrieve token details
   * This is done to avoid having to have the B2C client secret on the frontend
   * @param url The AZ B2C endpoint to post to
   */
  authenticate(url): Promise<TokenDetail> {
    return this.http.post<TokenDetail>(`${this.apiUrl}authentication`, { url }).toPromise();
  }

  getFuck() {
    return this.http.get(`${this.apiUrl}home/fuck`).toPromise();
  }

  getUser(): void {
    this.http.get<User>(`${this.apiUrl}users`).subscribe(user => {
      this.dataSvc.setUser(user);
    });
  }

  getTransactions(): void {
    console.log('getTransactions');
    this.http.get<Transaction[]>(`${this.apiUrl}transactions`).subscribe(transactions => {
      console.log(transactions);
      this.dataSvc.setTransactions(transactions);
    });
  }

  getDemarcations(): void {
    console.log('getDemarcations');
    this.http.get<Demarcation[]>(`${this.apiUrl}demarcations`).subscribe(demarcations => {
      console.log(demarcations);
      this.dataSvc.setDemarcations(demarcations);
    });
  }

  postDemarcation(demarcation: Demarcation): Promise<Demarcation> {
    return this.http.post<Demarcation>(`${this.apiUrl}demarcations`, demarcation).toPromise();
  }

  postCategory(category: Category): Promise<Category> {
    return this.http.post<Category>(`${this.apiUrl}categories`, category).toPromise();
  }
}
