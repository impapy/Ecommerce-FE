import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/View Model/iorder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  httpOptions = {};
  constructor(private http:HttpClient) { 
    this.httpOptions = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  createOrder(order:IOrder):Observable<any>{
    return this.http.post<IOrder>(`${environment.APIURL}/api/order/createOrder`,order,this.httpOptions)
  }

  GetAllOrders():Observable<IOrder[]>{
    return this.http.get<IOrder[]>(`${environment.APIURL}/api/order/userOrders`,this.httpOptions);
  }
  GetOrder(id:string):Observable<IOrder>{
    return this.http.get<IOrder>(`${environment.APIURL}/api/order/details/${id}`,this.httpOptions);
  }
  cancleOrder(id:string){
    return this.http.put<IOrder>(`${environment.APIURL}/api/order/cancel/${id}`,this.httpOptions);
  }
  getCancelledorders():Observable<IOrder[]>{
    return this.http.get<IOrder[]>(`${environment.APIURL}/api/order/user/get/orderCancelled`)

  }
  getArchivedorders():Observable<IOrder[]>{
    return this.http.get<IOrder[]>(`${environment.APIURL}/api/order/user/get/ArchivedOrders`)

  }


getRateForCoupon(name:string):Observable<any>{
return this.http.get<any>(`${environment.APIURL}/api/coupon/rate/${name}`,this.httpOptions)
}



}
