import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { ICart } from 'src/app/View Model/icart';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cart: ICart | undefined;
  carts: any;
  products: any[] = [];
  public product!: IProduct;
 PrdID: string = ''; 
  currentLang: string;
  randometenProduct: IProduct[] = []
  allproduct: IProduct[] = []
  randomeProduct: IProduct[] = []
  private subscriptionses: Subscription[] = [];
  ImgURL = environment.APIURL + "/";
  len: any;
  constructor(  private toastr: ToastrService,  private cartserve: CartService, public translate:TranslateService , private prdApiServ: ProductApiService
    ) { this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang) }

  ngOnInit(): void {

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



  onAddCard( product :IProduct) {
    let addprod = this.prdApiServ
      .addToCart(product._id as string, product.price, product.sellerId)
      .subscribe(
        (ad) => {
          let getcart: Subscription = this.cartserve
            .getCartByUserId()
            .subscribe(
              (cart) => {
                this.cart = cart;
                this.carts = cart;
                this.len = this.carts.items.length;
                this.cartserve.emit<number>(this.len);
                this.products = [];
                this.cart.items.forEach((prodele) => {
                  let getproduct = this.prdApiServ
                    .getProductByID(prodele.productId)
                    .subscribe(
                      (idprodcart) => {
                        this.products.push(idprodcart);
                      },
                      (err) => {
                        console.log(err);
                      }
                    );
                  this.toastr.success(`Item added successfully`, '', {
                    positionClass: 'toast-top-left',
                  });
                  this.subscriptionses.push(getproduct);
                });
              },
              (err) => {
                console.log(err);
                this.toastr.error(`${err.error.message}`, '', {
                  positionClass: 'toast-top-left',
                });
              }
            );
          this.subscriptionses.push(getcart);
        },
        (err) => {
          console.log(err);
          this.toastr.error(`${err.error.message}`, '', {
            positionClass: 'toast-top-left',
          });
        }
      );
    this.subscriptionses.push(addprod);
  }
 
}
