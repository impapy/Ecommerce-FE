import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from 'src/app/View Model/icart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpOptions = {};
  len:number=0;
  public subject=new BehaviorSubject<any>('')
  public Order = new BehaviorSubject<any>('')
  emit<T>(data:T){
    this.subject.next(data)
  }

  on<T>():Observable<T>{
    return this.subject.asObservable()
  }
  setorder<T>(data:T){
    this.Order.next(data)
  }
  
  getorder<T>():Observable<T>{
    return this.Order.asObservable()
  }

  constructor(private http:HttpClient) { 
    this.httpOptions = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  getCartByUserId():Observable<ICart>
  {
    return this.http.get<ICart>(environment.APIURL+'/api/cart')
  }
  ChageQuantity(cartId:string,productId:string,quantity:number):Observable<ICart>
  {
    let updateQuentity={quantity:quantity}
    return this.http.put<ICart>(environment.APIURL+'/api/cart/changeQuantity/'+cartId+'/'+productId,updateQuentity,this.httpOptions)
  }

  deleteItemFromCart(productId:string):Observable<ICart>
  {
    return this.http.delete<ICart>(environment.APIURL+'/api/cart/'+productId)
  }

  addToCart(productId:string,price:number,seller:string):Observable<ICart>
  {
    let prodId={items:{productId:productId,price:price,quantity:1,sellerId:seller}}
    return this.http.post<ICart>(environment.APIURL+'/api/cart/addToCart',prodId,this.httpOptions)
  }

  AddTotalPriceAndQuantity(cartId:string,TotalPrice:number,TotalQuentity:number):Observable<ICart>
  {
    let total={totalPrice:TotalPrice,totalCount:TotalQuentity}
    return this.http.put<ICart>(environment.APIURL+'/api/cart/changeTpATq/'+cartId,total,this.httpOptions)
  }
}
