import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/Services/address/address.service';
import { OrderApiService } from 'src/app/Services/order/order-api.service';
import { OrderService } from 'src/app/Services/order/order.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Iaddress } from 'src/app/View Model/iaddress';
import { IOrder } from 'src/app/View Model/iorder';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  // order:[]=[];
  addresses:Iaddress[]=[]
  userName:string=""
  currentLang: string;
  p:number = 1;
  defaultAdr!:Iaddress;
  constructor(
    private userService:UserAuthService,
    private orderService:OrderApiService
    ,public translate:TranslateService,
    private router:Router,
    private addressSerrve:AddressService    
    ,private toastr: ToastrService,
    ) { this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang) }

  ngOnInit(): void {
    this.orderService.GetAllOrders().subscribe(item =>{
      console.log(item)
      // this.order=item
    })
    this.userService.userName$.subscribe(userName => {
      const user = JSON.parse(localStorage.getItem('user')as string);
      this.userName = user.name
  
    })
    this.addressSerrve.getUserAddresses().subscribe(data=>{
      console.log("addresses",data)
      this.addresses = data;
    })
    this.addressSerrve.getDefaultAddress().subscribe(data=>{
      console.log("defuiiiii",data)
      this.defaultAdr = data;
    })
    
  }
  deleteAddress(id:string){
    this.addressSerrve.deleteUserAddresses(id).subscribe(_data=>{
      this.addressSerrve.getUserAddresses().subscribe(data=>{
        this.addresses = data;
        this.toastr.error('Address was deleted successfully..');
      })
    })
    
  }
  defaultAddress(id:string){
    this.addressSerrve.defaultAddress(id).subscribe(_data=>{
      this.addressSerrve.getUserAddresses().subscribe(data=>{
        this.addresses = data;
        this.toastr.success('Address was set as a default successfully..');
      })
    })
  }

}