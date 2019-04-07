import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenDetail } from '../models/token-detail';
import { User } from '../models/user';
import { DataService } from './data.service';
import { Transaction } from '../models/transaction';
import { Category } from '../models/category';
import { Location } from '../models/location';
import { Tag } from '../models/tag';
import { Person } from '../models/person';
import { BurndownEntry } from '../models/burndown-entry';

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

  getUser(): void {
    this.http.get<User>(`${this.apiUrl}users`).subscribe(user => {
      this.dataSvc.setUser(user);
    });
  }

  postTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}transactions`, transaction).toPromise();
  }

  deleteTransaction(transactionId: number): Promise<any> {
    return this.http.delete(`${this.apiUrl}transactions/${transactionId}`).toPromise();
  }

  getTransactions(): void {
    this.http.get<Transaction[]>(`${this.apiUrl}transactions`).subscribe(transactions => {
      this.dataSvc.setTransactions(transactions);
    });
  }

  getCategories(): void {
    this.http.get<Category[]>(`${this.apiUrl}categories`).subscribe(categories => {
      this.dataSvc.setCategories(categories);
    });
  }

  postCategory(category: Category): Promise<Category> {
    return this.http.post<Category>(`${this.apiUrl}categories`, category).toPromise();
  }

  getLocations(): void {
    this.http.get<Location[]>(`${this.apiUrl}locations`).subscribe(locations => {
      this.dataSvc.setLocations(locations.filter(x => x !== null));
    });
  }

  postLocation(location: Location): Promise<Location> {
    return this.http.post<Location>(`${this.apiUrl}locations`, location).toPromise();
  }

  postTag(tag: Tag): Promise<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}tags`, tag).toPromise();
  }

  getTags(): void {
    this.http.get<Tag[]>(`${this.apiUrl}tags`).subscribe(tags => {
      console.log('tags', tags);
      this.dataSvc.setTags(tags.filter(x => x !== null));
    });
  }

  postPerson(person: Person): Promise<Person> {
    return this.http.post<Person>(`${this.apiUrl}people`, person).toPromise();
  }

  getPeople(): void {
    this.http.get<Person[]>(`${this.apiUrl}people`).subscribe(people => {
      this.dataSvc.setPeople(people.filter(x => x !== null));
    });
  }

  getBalance() {
    this.http.get<number>(`${this.apiUrl}reports/balance`).subscribe(balance => {
      this.dataSvc.setBalance(balance);
    });
  }

  getBurndownEntries() {
    this.http.get<BurndownEntry[]>(`${this.apiUrl}reports/burndown`).subscribe(entries => {
      this.dataSvc.setBurndownEntries(entries);
    });
  }
}
