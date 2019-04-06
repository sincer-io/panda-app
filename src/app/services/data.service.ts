import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Demarcation } from '../models/demarcation';
import { User } from '../models/user';
import { Transaction } from '../models/transaction';
import { Category } from '../models/category';
import { Location } from '../models/location';
import { BurndownEntry } from '../models/burndown-entry';
import { Tag } from '../models/tag';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userSource = new BehaviorSubject<User>(null);
  user: Observable<User> = this.userSource.asObservable();

  private demarcationsSource = new BehaviorSubject<Demarcation[]>([]);
  demarcations: Observable<Demarcation[]> = this.demarcationsSource.asObservable();

  private transactionsSource = new BehaviorSubject<Transaction[]>([]);
  transactions: Observable<Transaction[]> = this.transactionsSource.asObservable();

  private categoriesSource = new BehaviorSubject<Category[]>([]);
  categories: Observable<Category[]> = this.categoriesSource.asObservable();

  private locationsSource = new BehaviorSubject<Location[]>([]);
  locations: Observable<Location[]> = this.locationsSource.asObservable();

  private tagsSource = new BehaviorSubject<Tag[]>([]);
  tags: Observable<Tag[]> = this.tagsSource.asObservable();

  private peopleSource = new BehaviorSubject<Person[]>([]);
  people: Observable<Person[]> = this.peopleSource.asObservable();

  private balanceSource = new BehaviorSubject<number>(null);
  balance: Observable<number> = this.balanceSource.asObservable();

  private burndownEntriesSource = new BehaviorSubject<BurndownEntry[]>([]);
  burndownEntries: Observable<BurndownEntry[]> = this.burndownEntriesSource.asObservable();

  constructor() { }

  setUser(user: User) {
    this.userSource.next(user);
  }

  setTransactions(transactions: Transaction[]) {
    this.transactionsSource.next(transactions);
  }

  addTransaction(transaction: Transaction){
    let transactions = [...this.transactionsSource.value, transaction].sort((x, y) => y.date.localeCompare(x.date));
    if(transactions.length > 1){
      this.transactionsSource.next(transactions);
    }
  }

  setCategories(categories: Category[]) {
    this.categoriesSource.next(categories);
  }

  setDemarcations(demarcations: Demarcation[]) {
    this.demarcationsSource.next(demarcations);
  }

  addDemarcation(demarcation: Demarcation) {
    let newDemarcationList = this.demarcationsSource.value;
    newDemarcationList.push(demarcation);
    this.setDemarcations(newDemarcationList);
  }

  setBurndownEntries(burndownEntries: BurndownEntry[]) {
    this.burndownEntriesSource.next(burndownEntries);
  }

  setBalance(balance: number) {
    this.balanceSource.next(balance);
  }

  setLocations(locations: Location[]) {
    this.locationsSource.next(locations);
  }

  setTags(tags: Tag[]) {
    this.tagsSource.next(tags);
  }

  setPeople(people: Person[]) {
    this.peopleSource.next(people);
  }
  
}
