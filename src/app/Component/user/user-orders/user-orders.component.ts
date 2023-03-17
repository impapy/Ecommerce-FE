import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderApiService } from 'src/app/Services/order/order-api.service';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { IOrder } from 'src/app/View Model/iorder';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/Services/order/order.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  Orders: IOrder[]=[];
  cancelledOrders: IOrder[]=[];
  ImgURL = environment.APIURL + "/";
  userName:string=""
  // product!:IProduct;
  isCanceled:boolean = false;
  currentLang: string;
  p:number = 1;
  constructor(
    private ordApiService:OrderApiService,
    private userService:UserAuthService,
    // private prdApi:ProductApiService,,
    private spinner: NgxSpinnerService,
    private router:Router,
    public translate:TranslateService
    ) { 
      this.currentLang=localStorage.getItem('current_lang')||'en';
      this.translate.use(this.currentLang)
  }
  
  ngOnInit(): void { 
    this.spinner.show();
    this.ordApiService.GetAllOrders().subscribe(ele =>{   
      this.Orders = ele;      
      console.log(ele);   
    })

    this.userService.userName$.subscribe(userName => {
      const user = JSON.parse(localStorage.getItem('user')as string);
      this.userName = user.name
    }) 
  }

  ViewOrder(){
    console.log("getCancelledorders....")
    this.ordApiService.getCancelledorders().subscribe(data =>{
      console.log("getCancelledorders....",data)
      this.Orders = data;
    })
  }
  ViewArchivedOrders(){
    // this.isCanceled = true;
    this.ordApiService.getArchivedorders().subscribe(data =>{
      console.log("getArchivedorders....",data)
      this.Orders = data;
    })
    // console.log("gggg",this.Orders)
  }
  reload(){
    this.ordApiService.GetAllOrders().subscribe(ele =>{   
      this.Orders = ele;   
    })
  }

  cancel(id:string){
    this.ordApiService.cancleOrder(id).subscribe(order=>{
      this.router.navigate(['/Order/cancel',id])
    })
  }
  decrease(){
    --this.p;
    if(!this.isCanceled){
      this.ordApiService.GetAllOrders().subscribe(ele =>{
        console.log(ele)
        this.Orders = ele; 
      })
    }else{
      this.ordApiService.getCancelledorders().subscribe(data =>{
      console.log(data)
      this.Orders = data;
    })
    }
    this.router.navigate(['/User/user-orders'])      
  }
  increase(){
    ++this.p;
    if(!this.isCanceled){
      this.ordApiService.GetAllOrders().subscribe(ele =>{
        console.log(ele)
        this.Orders = ele; 
      })
    }else{
      this.ordApiService.getCancelledorders().subscribe(data =>{
      console.log(data)
      this.Orders = data;
    })
    }
    this.router.navigate(['/User/user-orders'])     
  }

}