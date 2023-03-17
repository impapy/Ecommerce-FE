import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { Ipayment } from 'src/app/View Model/ipayment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentMethod =new BehaviorSubject<any>("");
  httpOptions = {}
  constructor(private router:Router, private http:HttpClient) {
    
    this.httpOptions = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

  setPaymentMethod(obj:Ipayment):void{
    console.log(obj)
    this.paymentMethod.next( obj)
    this.router.navigate(['/Order/order'])
  }
  getPaymentMethod():Observable<Ipayment>{
    return this.paymentMethod;
  }
  pay(obj:any):Observable<any>{
    return this.http.post(`${environment.APIURL}/api/payment/pay`, JSON.stringify(obj),this.httpOptions)
  }
}
