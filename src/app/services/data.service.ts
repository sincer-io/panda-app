import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Demarcation } from '../models/demarcation';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userSource = new BehaviorSubject<User>(null);
  user: Observable<User> = this.userSource.asObservable();

  private demarcationsSource = new BehaviorSubject<Demarcation[]>([]);
  demarcations: Observable<Demarcation[]> = this.demarcationsSource.asObservable();

  constructor() { }

  setUser(user: User) {
    this.userSource.next(user);
  }

  setDemarcations(demarcations: Demarcation[]) {
    this.demarcationsSource.next(demarcations);
  }

}
