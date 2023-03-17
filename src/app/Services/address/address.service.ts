import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICountry } from 'src/app/View Model/icountry';
import { IGovs } from 'src/app/View Model/igovs';
import { ICity } from 'src/app/View Model/icity';
import { Iaddress } from 'src/app/View Model/iaddress';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  httpOptions = {}
  constructor(private http:HttpClient) {
    this.httpOptions = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  getCountries():Observable<ICountry[]>{
    return this.http.get<ICountry[]>(`${environment.APIURL}/api/country`)
  }
  // getCountry(name:string): Observable<Object>{
  //   return this.http.get(`${environment.APIURL}/api/country/${name}`)
  // }
  // getGov(name:string): Observable<Object>{
  //   return this.http.get(`${environment.APIURL}/api/governate/Gov/${name}`)
  // }
  getGovs(ctryname:string): Observable<IGovs[]>{
    return this.http.get<IGovs[]>(`${environment.APIURL}/api/governate/${ctryname}`)
  }
  getCities(govName:string): Observable<ICity[]>{
    console.log(govName)
    return this.http.get<ICity[]>(`${environment.APIURL}/api/city/${govName}`)
  }
  getUserAddresses():Observable<Iaddress[]>{
    return this.http.get<Iaddress[]>(`${environment.APIURL}/api/address`)
  }
  getUserAddress(id:string):Observable<Iaddress>{
    return this.http.get<Iaddress>(`${environment.APIURL}/api/address/${id}`)
  }
  deleteUserAddresses(id:string):Observable<Iaddress[]>{
    return this.http.delete<Iaddress[]>(`${environment.APIURL}/api/address/${id}`)
  }
  addAddresses(adr:Iaddress):Observable<Iaddress[]>{
    return this.http.post<Iaddress[]>(`${environment.APIURL}/api/address`,adr,this.httpOptions)
  }
  EditAddresses(adr:Iaddress,id:string):Observable<Iaddress[]>{
    return this.http.put<Iaddress[]>(`${environment.APIURL}/api/address/${id}`,adr,this.httpOptions)
  }
  defaultAddress(id:string):Observable<Iaddress>{
    return this.http.put<Iaddress>(`${environment.APIURL}/api/address/default/${id}`,this.httpOptions)
  }
  getDefaultAddress():Observable<Iaddress>{
    return this.http.get<Iaddress>(`${environment.APIURL}/api/address/get/default`)
  }
}
