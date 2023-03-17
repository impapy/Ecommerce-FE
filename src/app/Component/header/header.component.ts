import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/Services/address/address.service';
import { CartService } from 'src/app/Services/cart/cart.service';
import { CategoryService } from 'src/app/Services/category/category.service';
import { LocalStorageService } from 'src/app/Services/localStorageService/local-storage.service';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';
import { ICategory } from 'src/app/View Model/icategory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName:any;
  isLogged: any
  categories:ICategory[]=[];
  category!:ICategory;
  subCategories :ICategory[] = []
  cart:any
  lenh:number=0;
  usName :any;
  currentLang: string;
  term:any;
  valOfSearch:any;
  Igovernate:string='Egypt'
  PriceLang:string='EGP'
  constructor(
    private userService:UserAuthService,
    public router: Router,
    private catService:CategoryService,
    private cartserve:CartService,
    private wishlistServe:WishlistService,
    public translate:TranslateService,
    private prdApiService:ProductApiService,
    private toastr: ToastrService,
    private authService: SocialAuthService,
    private addressService:AddressService,
    private storageService:LocalStorageService

    ) {
    this.isLogged = this.userService.isLoggedIn
    // console.log("header",this.isLogged )
    // this.userService.isLoggedStatus().subscribe(isLogged => {
    //   this.isLogged = isLogged;
    //   console.log("header",this.isLogged)
    // })
    // this.openPopup=false;
    this.currentLang=localStorage.getItem('current_lang')||'en';
    this.PriceLang=localStorage.getItem('currency')||'EGP';
    this.translate.use(this.currentLang)

  }
  changeCurrentLang(lang:string){
    this.translate.use(lang);
    localStorage.setItem('current_lang',lang);
    this.currentLang=lang;
    window.location.reload()

  }
  changePriceLang(langPrice:string){
    localStorage.setItem('currency',langPrice);
    this.PriceLang=langPrice;
    window.location.reload()

  }

  ngOnInit(): void {
    this.usName = {en :'mohamed',ar:'محمد'};
    const user = JSON.parse(localStorage.getItem('user')as string);
    this.catService.getAllCategory().subscribe(categories=>{
      console.log(categories)
      this.categories = categories;
    })
    this.userService.userName$.subscribe(userName => {
      if(user){this.userName = user.name}else{this.userName =' '}
      // console.log("dafdsa",user.name);
      // console.log("this.userName",this.userName[this.translate.currentLang]);


    })
    if(user){
      this.storageService.watchStorage().subscribe((data:string) => {
        console.log(data);
        this.userName = localStorage.getItem('name') as string;
        // this will call whenever your localStorage data changes
        // use localStorage code here and set your data here for ngFor
        })
      this.cartserve.getCartByUserId().subscribe(cart=>{
        this.cart=cart
        this.lenh= this.cart.items.length
      })

      this.cartserve.on<number>().subscribe(data=>{
        this.lenh=data
      })
    }

this.addressService.getDefaultAddress().subscribe(AD=>{
  this.Igovernate=AD.governate||"Egypt"
console.log(this.Igovernate)
})

  }
  subCate(subname:any){
    this.catService.getCategory(subname).subscribe(category => {
      this.category = category;
      if(this.currentLang == 'ar'){
        this.subCategories = this.category.arSubCategories
      }else{
        this.subCategories = this.category.subCategories

      }
    })
  }
  logout(){
    this.userService.Logout();
    this.authService.signOut();
  }
  createWishList(x:string){
    this.wishlistServe._AddWishList(x).subscribe(data=>{
      this.toastr.success(`${data.name} added successfully`,"",{
        positionClass: 'toast-top-left'
      });
      this.router.navigate(['/Wishlist'])
    }
    , err => {
      this.toastr.error(`${err.error.msg}`,"",{
        positionClass: 'toast-top-left'
      });
    })
  }
  searchByVal(val:string){
    this.valOfSearch=val;
    this.prdApiService.emit<string>(this.valOfSearch);
    this.router.navigate(['/Product/of/search'])

  }
  //  document.querySelectorAll(".nav-down")



}
