import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';
import { ICart } from './../../View Model/icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy{
  cart: ICart | undefined
  carts: any
  product: any[] = []
  productafterdel: any[] = []
  randomeProduct: IProduct[] = []
  allproduct: IProduct[] = []
  ImgURL = environment.APIURL + "/";
  len: number = 0;
  all: any[] = []
  selectedDevice: any | undefined
  totalprice: number = 0;
  count: number = 0;
  checks: boolean = false
  refresh = new BehaviorSubject<boolean>(true);
  randometenProduct: IProduct[] = []
  private subscriptionses: Subscription[] = [];
  toorder: any[]=[];
  TheOrdet:any[]=[]
  constructor(
    private toastr: ToastrService,
    private cartserve: CartService,
    private prdApiServ: ProductApiService
  ) { }

  ngOnInit(): void {

    let getcart: Subscription = this.cartserve.getCartByUserId().subscribe(cart => {
      console.log(cart)
      this.cart = cart
      this.carts = cart
        this.len = this.carts.items.length
      this.cart.items.forEach(prodele => {
        let getproduct = this.prdApiServ.getProductByID(prodele.productId).subscribe(idprodcart => {
          Object.assign(idprodcart, {Quentity:prodele.quantity});
          this.product.push(idprodcart)
        }, err => {
          console.log(err)
        })
        this.subscriptionses.push(getproduct);
      })
    }, err => {
      console.log(err)
    })
    this.subscriptionses.push(getcart);
    let getallproduct = this.prdApiServ.GetAllProduct().subscribe(productele => {
      this.allproduct = productele
      for (let i = 0; this.randomeProduct.length < 3; i++) {
        let j = Math.floor(Math.random() * this.allproduct.length)
        if (!(this.randomeProduct.includes(this.allproduct[j]))) {
          this.randomeProduct.push(this.allproduct[j]);
        }
      }
      for (let i = 0; this.randometenProduct.length < 9; i++) {
        let j = Math.floor(Math.random() * this.allproduct.length)
        if (!(this.randometenProduct.includes(this.allproduct[j]))) {
          this.randometenProduct.push(this.allproduct[j]);
        }
      }
    }, err => {
      console.log(err)
    })
    this.subscriptionses.push(getallproduct);
  }

  createArray(n: number) {
    return Array.from(Array(n).keys()).map(v => v + 1);
  }

  onChange(valuesel: any, prodId: any, inStock:number) {
    this.totalprice = 0;
    this.count = 0;
    if(valuesel <= inStock){
      let changeQuen = this.cartserve.ChageQuantity(this.carts._id, prodId, valuesel).subscribe(updQuen => {
        valuesel = updQuen

        let getcart: Subscription = this.cartserve.getCartByUserId().subscribe(cart => {
          this.cart = cart
          this.carts = cart

          this.len = this.carts.items.length

          this.product = []

          this.cart.items.forEach(prodele => {
            let getproduct = this.prdApiServ.getProductByID(prodele.productId).subscribe(idprodcart => {
              Object.assign(idprodcart, {Quentity:prodele.quantity});
              this.product.push(idprodcart)

            }, err => {
              console.log(err)
            })
            this.subscriptionses.push(getproduct);
          })


        }, err => {
          console.log(err)
        })
        this.subscriptionses.push(getcart);

      }, err => {
        console.log(err)
      })
      this.subscriptionses.push(changeQuen);

    }else{
      alert("Product is out of stock....")
    }

      }


  /////////////////////////delete item from cart
  onDelete(prodId: any) {
    this.totalprice = 0;
    this.count = 0;
    let delprod = this.cartserve.deleteItemFromCart(prodId).subscribe(del => {

      let getcart: Subscription = this.cartserve.getCartByUserId().subscribe(cart => {
        this.cart = cart
        this.carts = cart

        this.len = this.carts.items.length
        this.cartserve.emit<number>(this.len);

        this.product = []

        this.cart.items.forEach(prodele => {
          let getproduct = this.prdApiServ.getProductByID(prodele.productId).subscribe(idprodcart => {
            Object.assign(idprodcart, {Quentity:prodele.quantity});
            this.product.push(idprodcart)

          }, err => {
            console.log(err)
          })
          this.subscriptionses.push(getproduct);
        })


      }, err => {
        console.log(err)
      })
      this.subscriptionses.push(getcart);
      this.toastr.error('Item was deleted successfully..',"",{
        positionClass: 'toast-top-left'
      })

    }, err => {
      console.log(err)
    })
    this.subscriptionses.push(delprod);


  }


  //Add item to cart
  onAddCart(prodId: any) {
    console.log("from cart ====",prodId)
    this.totalprice = 0;
    this.count = 0;
    let addprod = this.cartserve.addToCart(prodId._id, prodId.priceafterdiscount,prodId.sellerId).subscribe(ad => {
      let getcart: Subscription = this.cartserve.getCartByUserId().subscribe(cart => {
        this.cart = cart
        this.carts = cart
        this.len = this.carts.items.length
        this.cartserve.emit<number>(this.len);
        this.product = []
        this.cart.items.forEach(prodele => {
          let getproduct = this.prdApiServ.getProductByID(prodele.productId).subscribe(idprodcart => {
            Object.assign(idprodcart, {Quentity:prodele.quantity});
            this.product.push(idprodcart)
          }, err => {
            console.log(err)
          })
          this.subscriptionses.push(getproduct);
        })
      }, err => {
        console.log(err)
      })
      this.subscriptionses.push(getcart);
      this.toastr.success(`Item added successfully`,"",{
        positionClass: 'toast-top-left'
      });
    }, err => {
      console.log(err)
    })
    this.subscriptionses.push(addprod);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  // to save total price and count
  onAddTotal() {
    this.TheOrdet=[]
    this.TheOrdet.push({items:this.toorder,TotalPrice:this.totalprice,AllCount:this.count})
    this.cartserve.setorder<any>(this.TheOrdet[0]);
    console.log('totalorder from cart',this.TheOrdet)
  }


  bulk(event: any, price: number, quent: any) {
    console.log("from bulk",quent)
    if (event.target.checked == true) {
    
      this.totalprice += price
      this.count += quent.quantity
      this.toorder.push({prodId:quent.productId,coountorder:quent.quantity,sellrId:quent.sellerId?._id})
      console.log('new ord', this.toorder)
    }
    if (event.target.checked == false) {
      this.totalprice = this.totalprice - price
      this.count -= quent.quantity
      this.toorder.splice(this.toorder.findIndex(e=>e.prodId===quent._id),1)
      console.log('new ', this.toorder)
    }
  }


  onchecked() {
    this.checks = !this.checks
    if (this.checks) {
      let i = 0;
      this.product.forEach(allpric => {
        // console.log(allpric)
        this.toorder.push({prodId:allpric._id,coountorder:this.carts.items[i].quantity,sellerId:allpric.sellerId?._id})
 
        this.totalprice += allpric.priceafterdiscount
       

        this.count += this.carts.items[i].quantity
        i++
      })
    }
    if (!this.checks) {
      this.totalprice = 0
      this.count = 0
      this.toorder=[]
    }
  }


  ngOnDestroy() {
    for (let sub of this.subscriptionses)
      sub.unsubscribe();
  }

}
