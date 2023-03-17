import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProductService } from 'src/app/Services/product/product.service';
import { IProduct } from 'src/app/View Model/iproduct';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ICart } from 'src/app/View Model/icart';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';
import { TranslateService } from '@ngx-translate/core';
import { Iwishlist } from 'src/app/View Model/iwishlist';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  [x: string]: any;
  cart: ICart | undefined;
  carts: any;
  products: any[] = [];
  public product!: IProduct;
  public PrdID: string = '';
  public imgURL = environment.APIURL + '/';
  public subscribtions: Subscription[] = [];
  // ---------------------------------------
  toggleItemVal: number = 4;
  toggleItembol: boolean = false;

  // =========================
  ModelItemColor?: any;
  NameColor?: any;
  imgSrc: any;
  // =========================
  valRat = 0;
  review = {
    rating: 0,
    comment: '',
  };
  Rating = 0;
  // =========================
  userID = '';

  Wishlist: Iwishlist[] = [];
  // Wishlist = {
  //   productId: '',
  //   nameEn: '',
  // };

  reviews: any;
  reviews_length = 0;
  reviews_5Str = 0;
  reviews_4Str = 0;
  reviews_3Str = 0;
  reviews_2Str = 0;
  reviews_1Str = 0;
  Str5 = 0;
  Str4 = 0;
  Str3 = 0;
  Str2 = 0;
  Str1 = 0;

  currentLang: string;
  reviews_rat: any;
  // =============================
  wishListForm: FormGroup;
  //==============================
  date = new Date();
  today: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private prdApi: ProductApiService,
    private wishlistServe: WishlistService,
    private userService: UserAuthService,
    private prdApiServ: ProductApiService,
    private cartserve: CartService,
    public translate: TranslateService,
    public fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.currentLang = localStorage.getItem('current_lang') || 'en';
    this.translate.use(this.currentLang);
    this.wishListForm = this.fb.group({
      listName: [''],
    });
  }

  changePrice(e: any) {
    this.product.price = e.target.value;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.wishlistServe.getWishListsForUser().subscribe((wishlist) => {
      this.Wishlist = wishlist;
    });

    this.userService.userName$.subscribe((userName) => {
      const user = JSON.parse(localStorage.getItem('user') as string);
      console.log(user._id);

      this.userID = user._id;
    });

    let SubscriptionOne = this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.PrdID = String(paramMap.get('Id'));

        this.prdApi.getProductByID(this.PrdID).subscribe(
          (prd) => {
            this.product = prd;
            console.log('9999999999', this.product);
            if (prd.discount != 0) {
              this.product.price = this.product.priceafterdiscount;
            }
            this.imgSrc = this.imgURL + prd.imagePath[0];

            this.reviews_length = prd.reviews.length;
            if (prd.reviews.length > 0) {
              prd.reviews.forEach((element) => {
                switch (element.rating) {
                  case 5:
                    this.reviews_5Str++;

                    break;
                  case 4:
                    this.reviews_4Str++;
                    break;
                  case 3:
                    this.reviews_3Str++;
                    break;
                  case 2:
                    this.reviews_2Str++;
                    break;
                  case 1:
                    this.reviews_1Str++;
                    break;
                  default:
                    break;
                }
              });
              if (this.currentLang == 'ar') {
                this.arr =
                  prd.ardescription.split('.') && prd.ardescription.split(',');
              } else {
                this.arr =
                  prd.description.split('.') && prd.description.split(',');
              }

              this.Str5 = Math.round(
                (this.reviews_5Str / this.reviews_length) * 100
              );
              this.Str4 = Math.round(
                (this.reviews_4Str / this.reviews_length) * 100
              );
              this.Str3 = Math.round(
                (this.reviews_3Str / this.reviews_length) * 100
              );
              this.Str2 = Math.round(
                (this.reviews_2Str / this.reviews_length) * 100
              );
              this.Str1 = Math.round(
                (this.reviews_1Str / this.reviews_length) * 100
              );
            }else{
              this.reviews_5Str = 0;
              this.reviews_4Str = 0;
              this.reviews_3Str = 0;
              this.reviews_2Str = 0;
              this.reviews_1Str = 0;
              this.Str5 = 0;
              this.Str4 = 0;
              this.Str3 = 0;
              this.Str2 = 0;
              this.Str1 = 0;
              this.reviews_length = 0;
            }

            if (this.currentLang == 'ar') {
              this.arr =
                prd.ardescription.split('.') && prd.ardescription.split(',');
            } else {
              this.arr =
                prd.description.split('.') && prd.description.split(',');
            }
          },
          (err) => {
            console.log(err);
          }
        );
      },

      (err) => {
        console.log(err);
      }
    );
    this.subscribtions.push(SubscriptionOne);
    console.log('from prd c: ', this.wishListForm.value);

    this.date.setDate(this.date.getDate() + 3);
    this.today = moment(this.date).format('YYYY-MM-DD ');
    console.log(this.today, 'hoy');
  }

  ngOnDestroy(): void {
    for (let sub of this.subscribtions) sub.unsubscribe();
  }
  toggleItem() {
    this.toggleItembol = !this.toggleItembol;
    if (this.toggleItembol) {
      this.toggleItemVal = 40;
    } else {
      this.toggleItemVal = 4;
    }
  }

  clickImgColor(item: any) {
    this.ModelItemColor = item;
    console.log(this.ModelItemColor);
    this.NameColor = item.key;
    this.imgSrc = this.imgURL + item.img[0];
  }

  clickChangeImg(item: any) {
    this.imgSrc = this.imgURL + item;
  }

  ratingToVal(valRat: number) {
    this.valRat = valRat;
    this.Rating = valRat;
    console.log(this.valRat);
  }
  RemoveReview(commit: any) {
    commit.value = '';
    this.valRat = 0;
  }

  AddReview(val: string) {
    if (val && this.valRat) {
      this.review = {
        rating: this.valRat,
        comment: val,
      };

      let sub3 = this.prdApi
        .createProductReview(this.PrdID, this.review)
        .subscribe((review) => {
         
          this.product.reviews = review.reviews;
          this.product.ratings = review.ratings;
          this.product.numReviews = review.numReviews;

          this.reviews_5Str = 0;
          this.reviews_4Str = 0;
          this.reviews_3Str = 0;
          this.reviews_2Str = 0;
          this.reviews_1Str = 0;
          this.Str5 = 0;
          this.Str4 = 0;
          this.Str3 = 0;
          this.Str2 = 0;
          this.Str1 = 0;
          this.reviews_length = 0;
          this.reviews_length = review.numReviews;

          review.reviews.forEach((element) => {
            switch (element.rating) {
              case 5:
                this.reviews_5Str++;

                break;
              case 4:
                this.reviews_4Str++;
                break;
              case 3:
                this.reviews_3Str++;
                break;
              case 2:
                this.reviews_2Str++;
                break;
              case 1:
                this.reviews_1Str++;
                break;
              default:
                break;
            }
          }),
            (this.Str5 = Math.round(
              (this.reviews_5Str / this.reviews_length) * 100
            ));
          this.Str4 = Math.round(
            (this.reviews_4Str / this.reviews_length) * 100
          );
          this.Str3 = Math.round(
            (this.reviews_3Str / this.reviews_length) * 100
          );
          this.Str2 = Math.round(
            (this.reviews_2Str / this.reviews_length) * 100
          );
          this.Str1 = Math.round(
            (this.reviews_1Str / this.reviews_length) * 100
          );
          this.product = review;
          this.toastr.success(`review has added successfully`, '', {
            positionClass: 'toast-top-left',
          });
        },(err)=>{
          this.toastr.error(`you Should login first`, '', {
            positionClass: 'toast-top-left',
          });
        });
      this.subscribtions.push(sub3);
      console.log(this.review);
    } else {
      this.toastr.info(`Please Enter Rating`, '', {
        positionClass: 'toast-top-left',
      });
      return;
    }
    
    // window.location.reload();
  }

  onmoseenterHover(val: any, num: number) {
    this.Rating = num;
  }

  delete(item: any) {
    let subDe = this.prdApi
      .deleteReview(this.PrdID, item._id)
      .subscribe((review) => {
        this.product = review;

        this.reviews_length = 0;
        this.reviews_5Str = 0;
        this.reviews_4Str = 0;
        this.reviews_3Str = 0;
        this.reviews_2Str = 0;
        this.reviews_1Str = 0;
        this.Str5 = 0;
        this.Str4 = 0;
        this.Str3 = 0;
        this.Str2 = 0;
        this.Str1 = 0;

        this.reviews_length = review.numReviews;
if(review.numReviews>0){
        review.reviews.forEach((element) => {
          switch (element.rating) {
            case 5:
              this.reviews_5Str++;

              break;
            case 4:
              this.reviews_4Str++;
              break;
            case 3:
              this.reviews_3Str++;
              break;
            case 2:
              this.reviews_2Str++;
              break;
            case 1:
              this.reviews_1Str++;
              break;
            default:
              break;
          }
        }),
          (this.Str5 = Math.round(
            (this.reviews_5Str / this.reviews_length) * 100
          ));
        this.Str4 = Math.round((this.reviews_4Str / this.reviews_length) * 100);
        this.Str3 = Math.round((this.reviews_3Str / this.reviews_length) * 100);
        this.Str2 = Math.round((this.reviews_2Str / this.reviews_length) * 100);
        this.Str1 = Math.round((this.reviews_1Str / this.reviews_length) * 100);
        this.product = review;
        this.toastr.error(`review has deleted successfully`, '', {
          positionClass: 'toast-top-left',
        });}
      });

    this.subscribtions.push(subDe);
    console.log('complete');
  }

  // ==================================================================
  createWishList() {
    const x = this.wishListForm.value;
    console.log('from prd c: ', x.listName, this.PrdID);
    this.wishlistServe.AddWishList(this.PrdID, x.listName).subscribe(
      (data) => {
        this.toastr.success(`Item added successfully`, '', {
          positionClass: 'toast-top-left',
        });
      },
      (err) => {
        this.toastr.error(`${err.error.msg}`, '', {
          positionClass: 'toast-top-left',
        });
      }
    );
  }

  //================================================================
  onAddCard() {
    let addprod = this.prdApi
      .addToCart(this.PrdID, this.product.price, this.product.sellerId)
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
                  this.subscribtions.push(getproduct);
                });
              },
              (err) => {
                console.log(err);
                this.toastr.error(`${err.error}`, '', {
                  positionClass: 'toast-top-left',
                });
              }
            );
          this.subscribtions.push(getcart);
        },
        (err) => {
          console.log(err);
          this.toastr.error(`you should Login first`, '', {
            positionClass: 'toast-top-left',
          });
        }
      );
    this.subscribtions.push(addprod);
  }
}
