import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Demarcation } from '../models/demarcation';
import { User } from '../models/user';
import { Transaction } from '../models/transaction';
import { GroupedTransactions } from '../models/grouped-transactions';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userSource = new BehaviorSubject<User>(null);
  user: Observable<User> = this.userSource.asObservable();

  private demarcationsSource = new BehaviorSubject<Demarcation[]>([]);
  demarcations: Observable<Demarcation[]> = this.demarcationsSource.asObservable();

  private transactionsSource = new BehaviorSubject<GroupedTransactions[]>([]);
  transactions: Observable<GroupedTransactions[]> = this.transactionsSource.asObservable();

  constructor() { }

  setUser(user: User) {
    this.userSource.next(user);
  }

  setTransactions(transactions: GroupedTransactions[]) {
    this.transactionsSource.next(transactions);
  }

  setDemarcations(demarcations: Demarcation[]) {
    this.demarcationsSource.next(demarcations);
  }

  addDemarcation(demarcation: Demarcation){
    let newDemarcationList = this.demarcationsSource.value;
    newDemarcationList.push(demarcation);
    this.setDemarcations(newDemarcationList);
  }

}