import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/View Model/iorder';
import { IProduct } from 'src/app/View Model/iproduct';
import { ProductApiService } from '../product/product-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products :IProduct[] = [];
  prdQty:number[] = [];
  order!:IOrder;
  constructor(
    private prdService:ProductApiService
  ) { }

  getOrderItems(items:any):any{
    console.log("getOrderItems()", items)
    this.prdQty=[]
    this.products=[]
    for (let i of items){
      this.prdQty.push( i.coountorder)
      this.prdService.getProductByID(i.prodId).subscribe(prd=>{
        console.log("prd",prd)
            this.products.push(prd)
          })
    }
    console.log("getOrderItems()prds:  ",this.products, "this.prdQty", this.prdQty)
    return {prd:this.products, prdQty:this.prdQty};
  }



}
