import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { OrderApiService } from 'src/app/Services/order/order-api.service';
import { OrderService } from 'src/app/Services/order/order.service';
import { PaymentService } from 'src/app/Services/Payment/payment.service';
import { ShippingService } from 'src/app/Services/shipping/shipping.service';
import { Ipayment } from 'src/app/View Model/ipayment';
import { IProduct } from 'src/app/View Model/iproduct';
import { IUser } from 'src/app/View Model/iuser';
import { environment } from 'src/environments/environment';
import { IOrder } from './../../View Model/iorder';
import {
  ICreateOrderRequest,
  IPayPalConfig,
  NgxPaypalComponent,
} from 'ngx-paypal';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
  import * as moment from 'moment';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order = {} as IOrder;
  orderItems: any;
  totalPrice = 0;
  ordertotal = 0;
  prdsInOrder: any;
  ImgURL = environment.APIURL + '/';
  len = 0;
  name = 'Angular ' + VERSION.major;
  public payPalConfig?: IPayPalConfig;
  showSuccess!: boolean;
  showPaypalButtons: boolean = false;
  date = new Date();
  today: any;

  // priceBeforeApplyCoupon = new BehaviorSubject<number>(0)
  constructor(
    private payServe: PaymentService,
    private shippingServ: ShippingService,
    private cartserve: CartService,
    private orderServe: OrderApiService,
    private _orderServe: OrderService,
    private router: Router,
    private toastr: ToastrService,
  ) {}


    
  ngOnInit(): void {
    /////////////////
    this.date.setDate(this.date.getDate() + 3);
    this.today = moment(this.date).format('YYYY-MM-DD ');
    this.cartserve.getorder<any>().subscribe((data) => {
      console.log('heder',data)
      if(!data){
        this.router.navigate(['/Cart'])
      }
      //orderItems
      this.orderItems = data.items;
      this.order.orderItems = this.orderItems;
      //totalPrice
      this.totalPrice = data.TotalPrice;
      //shippingPrice
      data.TotalPrice < 100
        ? (this.order.shippingPrice = 0)
        : data.TotalPrice < 500
        ? (this.order.shippingPrice = 50)
        : (this.order.shippingPrice = 100);
      //taxPrice
      this.order.taxPrice = 0.15 * data.TotalPrice;
      //for display products
      console.log('.......here.......', this.orderItems);
      this.prdsInOrder = this._orderServe.getOrderItems(this.orderItems);
      console.log('products in order:  ', this.prdsInOrder);
      // //ordertotal
      this.ordertotal =
        this.order.shippingPrice + this.order.taxPrice + this.totalPrice;
      this.order.totalPrice = this.ordertotal;
      // console.log("totalprice: ",this.totalPrice)
      // console.log("shippingPrice: ",this.order.shippingPrice)
      // console.log("taxPrice: ",this.order.taxPrice)
      // console.log("ordertotal: ",this.ordertotal)
      // console.log("orderItems: ",this.orderItems)
      // console.log("Order:  ",this.order)
      // console.log("prdsInOrder ",this.prdsInOrder)
    });
    //paymentmethod
    this.payServe
      .getPaymentMethod()
      .subscribe((method) => (this.order.paymentmethod = method.paymentmethod));
    //shippingAddress
    this.shippingServ
      .getShippingAddress()
      .subscribe((shippingInfo) => (this.order.shippingAddress = shippingInfo));
    ////////////////////////////////////////////
    this.payPalConfig = {
      currency: 'USD',
      vault: 'true',
      clientId: environment.paypalKey,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.order.totalPrice.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.order.totalPrice.toString(),
                  },
                },
              },
              // items: [
              //   {
              //     name: "Enterprise Subscription",
              //     quantity: "1",
              //     category: "DIGITAL_GOODS",
              //     unit_amount: {
              //       currency_code: "USD",
              //       value: this.order.totalPrice.toString()
              //     }
              //   }
              // ]
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          ' %c onClientAuthorization -🙋 HANAA should probably inform your server about completed transaction HERE 👇',
          'color:rgb(37, 37, 151)'
        );
        console.log('this is payment data', data);
        this._orderServe.order = this.order;
        this.orderServe.createOrder(this.order).subscribe((data) => {
          console.log('after create orsder:   ', data);
          this.router.navigate(['/Order/thank/', data[0].Order._id]);
        });
        this.cartserve
          .getCartByUserId()
          .subscribe((cart) => (this.len = cart.items.length));
        this.cartserve.emit<number>(this.len);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  placeOrder() {
    console.log('in place order...', this.order);
    this._orderServe.order = this.order;
    this.orderServe.createOrder(this.order).subscribe((data) => {
      console.log('after create orsder:   ', data);
      this.router.navigate(['/Order/thank/', data[0].Order._id]);
    });
    this.cartserve
      .getCartByUserId()
      .subscribe((cart) => (this.len = cart.items.length));
    this.cartserve.emit<number>(this.len);
    // if(this.order.paymentmethod == 'PayPal'){
    //   this.payServe.pay(this.order).subscribe(data=>{
    //     // console.log(data)
    //     // window.location = data.forwardLink
    //   })
    // }else{
    //   console.log("you will pay by :  ",this.order.paymentmethod)
    // }
  }
  // =====================================

  ShowFromCoupon(ShowFrom: any,btn:any) {
    ShowFrom.classList.remove('d-none');
    ShowFrom.classList.add('d-block');
    btn.classList.add('d-none')

  }
  priceBeforeApplyCoupon=0;
  RateCoupon = 1;
  ApplyCoupon(couponCode: string) {
    if (couponCode.length>1){
    let sub = this.orderServe.getRateForCoupon(couponCode).subscribe((data) => {
      console.log('get Coupon', data);
      this.RateCoupon = data.Rate;
  
      this.priceBeforeApplyCoupon=this.order.totalPrice;
      // this.totalPrice= this.totalPrice *this.RateCoupon;
      this.order.totalPrice=(this.priceBeforeApplyCoupon - ( this.priceBeforeApplyCoupon * this.RateCoupon));

      this.ordertotal=this.order.totalPrice;
      
      this.toastr.success(`Coupon was applied successfully`, '', {
        positionClass: 'toast-top-left',
      });


      console.log(this.RateCoupon,"coupon",this.order.totalPrice);


//  this.order.totalPrice < 100
//   ? (this.order.shippingPrice = 0)
//   :this.order.totalPrice < 500
//   ? (this.order.shippingPrice = 50)
//   : (this.order.shippingPrice = 100);
//   this.priceBeforeApplyCoupon =
//   this.order.shippingPrice + this.order.taxPrice + this.order.totalPrice;
// // this.order.totalPrice = this.priceBeforeApplyCoupon;


      // ForError.classList.add('d-block')
    },(err)=>{
      this.toastr.error(err.error.message);
    });
    }else{
      this.toastr.error('Sorry you must Enter ِa correct coupon code ');
    }
  }
}
