import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Services/order/order.service';
import { IOrder } from 'src/app/View Model/iorder';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';
 import * as moment from 'moment';
@Component({
  selector: 'app-order-thanks',
  templateUrl: './order-thanks.component.html',
  styleUrls: ['./order-thanks.component.scss']
})
export class OrderThanksComponent implements OnInit {
  order!:IOrder;
  products!:IProduct[];
  ImgURL = environment.APIURL + "/";
  orderId:string = ''
     date = new Date();
   today: any;
   constructor(
    private orderService:OrderService,
    private activatedRoute: ActivatedRoute
  ) {
    this.products = this.orderService.products;
    this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.orderId = String(paramMap.get('id'));
        console.log(this.orderId)
      })
   }
  


  ngOnInit(): void {    this.date.setDate(this.date.getDate() + 3);
     this.today = moment(this.date).format('YYYY-MM-DD ');
    this.order = this.orderService.order
    console.log(this.order)
    console.log(this.orderService.products)
  }

}
