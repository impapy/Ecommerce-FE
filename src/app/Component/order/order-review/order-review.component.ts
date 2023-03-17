import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OrderApiService } from 'src/app/Services/order/order-api.service';
import { OrderService } from 'src/app/Services/order/order.service';
import { IOrder } from 'src/app/View Model/iorder';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  order!:IOrder;
  orderId:string = '';
  products:IProduct[] = [];
  ImgURL = environment.APIURL + "/";
  currentLang: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService:OrderApiService,
    private _orderService:OrderService,
    public translate:TranslateService
  ) {this.currentLang=localStorage.getItem('current_lang')||'en';
  this.translate.use(this.currentLang)
    this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.orderId = String(paramMap.get('id'));
        console.log(this.orderId)
      })
   }

  ngOnInit(): void {
    this.orderService.GetOrder(this.orderId).subscribe(data => {
      console.log("in review Order..", data)
      this.order = data;
      console.log("::::::::::::::::",this.order.orderItems)
      // this.products = this._orderService.getOrderItems(this.order.orderItems).prd
      //   console.log(this.products)
      
    })
      }
}
