import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';
import { IProduct } from 'src/app/View Model/iproduct';
import { Iwishlist } from 'src/app/View Model/iwishlist';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlist:Iwishlist[]=[]
  withListByN: Iwishlist[]=[];
  defoultList:string=''
  namelists: any[]=[];
  productList:IProduct[]=[]
  alllistByName:any[]=[]
  len: number = 0;
  Cards: any
  NameOfList:string="All WishList"
  ImgURL = environment.APIURL + "/";
  userName:string=''
  errmess: any;
  lnList: number=0;
  constructor(private wishserve:WishlistService,
    private prdApiServ: ProductApiService,
    private cardserve: CartService,
    private userService:UserAuthService,
    private router: Router,
    private toastr: ToastrService,

    ) { }

  ngOnInit(): void {

    this.userService.getUserName().subscribe(userName => {
      this.userName = userName;
    })



this.wishserve.getWishListsForUser().subscribe(wishlist=>{
  this.wishlist=wishlist
  this.withListByN=wishlist

this.wishlist.forEach(wish=>{
wish.items.forEach(idprodlist=>{
this.prdApiServ.getProductByID(idprodlist.productId).subscribe(idprodcart => {
  // this.productList.push( Object.assign( {NameList:wish.nameEn},idprodcart));
  // this.alllistByName.push(idprodcart,{NameList:wish.nameEn})
    this.productList.push(idprodcart)
this.lnList=this.productList.length
  }, err => {
    console.log(err)
  })
    // console.log('list for name',wish.nameEn,idprodlist.productId)
})


})
})
console.log('rr',this.productList)

// console.log('finished',this.alllistByName)

}



AddToCart(productList:any)
{
  this.cardserve.addToCart(productList._id, productList.price,productList.sellerId).subscribe(ad => {
     this.cardserve.getCartByUserId().subscribe(card => {
      this.Cards = card

      this.len = this.Cards.items.length

      this.cardserve.emit<number>(this.len);
      this.toastr.success(`Item added successfully`,"",{
        positionClass: 'toast-top-left'
      })
    }, err => {
      console.log(err)
      this.toastr.error(`${err.error}`,"",{
        positionClass: 'toast-top-left'
      });
    })
  }, err => {
    console.log(err)
    
  })
}




DeleteItemFromList(prod:any)
{

this.wishserve.deleteItemList(prod._id).subscribe(d=>{})

this.productList=[]
this.wishserve.getWishListsForUser().subscribe(wishlist=>{
  this.wishlist=wishlist
this.wishlist.forEach(wish=>{
wish.items.forEach(idprodlist=>{
this.prdApiServ.getProductByID(idprodlist.productId).subscribe(idprodcart => {
    this.productList.push(idprodcart)
    this.toastr.error(`Item was deleted successfully`,"",{
      positionClass: 'toast-top-left'
    });
  }, err => {
    console.log(err)
    this.errmess=err;
    
  })
})


})
})

console.log(this.errmess)
}






DeleteWithList(wish:any)
{
this.wishserve.deleteList(wish._id).subscribe(d=>{})
this.productList=[]
this.wishserve.getWishListsForUser().subscribe(wishlist=>{
  this.wishlist=wishlist
this.wishlist.forEach(wish=>{
wish.items.forEach(idprodlist=>{
this.prdApiServ.getProductByID(idprodlist.productId).subscribe(idprodcart => {
    this.productList.push(idprodcart)
    this.toastr.error(`List was deleted successfully`,"",{
      positionClass: 'toast-top-left'
    });
  }, err => {
    console.log(err)
    
  })
})


})
})

}

gitWishListByName(NameList:string)
{
  if(NameList=='')
  {
  this.NameOfList='All WishList';
    this.productList=[]
    this.wishlist.filter(naneliss=>naneliss.name!=NameList).forEach(n=>{
      this.lnList=n.items.length
      n.items.forEach(p=>{
        this.prdApiServ.getProductByID(p.productId).subscribe(idprodcart => {
            this.productList.push(idprodcart)
          }, err => {
            console.log(err)
          })
      })
    })

  }else{
  this.NameOfList=NameList;
  this.productList=[]
  this.wishlist.filter(naneliss=>naneliss.name===NameList).forEach(n=>{
    // this.wishlist.filter(naneliss=>naneliss.nameEn===NameList).forEach(n=>{
      this.lnList=n.items.length

    n.items.forEach(p=>{
      this.prdApiServ.getProductByID(p.productId).subscribe(idprodcart => {

          this.productList.push(idprodcart)

        }, err => {
          console.log(err)
        })
    })

  })
}
}


createWishList(x:string){
  this.wishserve._AddWishList(x).subscribe(data=>{
    this.toastr.success(`${x} added successfully`,"",{
      positionClass: 'toast-top-left'
    });
    this.wishlist.push(data)
  })
}

}
