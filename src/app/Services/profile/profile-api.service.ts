import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './../../View Model/iuser';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  private httpOptions = {};
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getUserByID(Id: string): Observable<IUser> {

 
    return this.http.get<IUser>(environment.APIURL + '/api/users/' + Id);
 
  }

  updateUser(Id: string, data: any): Observable<IUser> {
    return this.http.put<IUser>(
      environment.APIURL + '/api/users/' + Id,
      data,
      this.httpOptions
    );
  }
  checkEmail(email: string): Observable<any> {
    return this.http.get<any>( environment.APIURL + '/api/users/checkEmail/' + email);
  }
}