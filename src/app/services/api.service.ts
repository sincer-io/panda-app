import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenDetail } from '../models/token-detail';
import { User } from '../models/user';
import { DataService } from './data.service';
import { Demarcation } from '../models/demarcation';

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

  getDemarcations(): void {
    this.http.get<Demarcation[]>(`${this.apiUrl}demarcations`).subscribe(demarcations => {
      this.dataSvc.setDemarcations(demarcations);
    });
  }
}
