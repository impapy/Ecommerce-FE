import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IShippingInfo } from './../../View Model/ishipping-info';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  shippingAddress = new BehaviorSubject<IShippingInfo>(
    {
      country: "",
      fullName:"",
      city: "",
      phone:"",
      governate: ""
    }
  )
  constructor(private router:Router) { }


  setShippingAddress(obj:IShippingInfo):void{
    console.log(obj)
    this.shippingAddress.next(obj)
    this.router.navigate(['/Payment'])
  }

  getShippingAddress():Observable<IShippingInfo>{
    return this.shippingAddress;
  }
}
