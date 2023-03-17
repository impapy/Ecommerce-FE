import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { ProductService } from 'src/app/Services/product/product.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  fackproducts: IProduct[] = this.products.slice()
  productsAllArray: any = [];
  randomeProduct: any = [];
  electronicCategoryptoduct: any = [];
  randomeProductElectronic: any = [];
  subscriptions = []
  randomeProductAll: IProduct[] = [];
  FashionCategoryptoduct: any = []
  randomeProductFashion: any = []
  GroceryCategoryptoduct: any = []
  randomeProductGrocery: any = []
  sliderimg: Array<object> = [];
  im: string = ""
  imgurl = environment.APIURL + "/"
  sliderimg2: any[] = []
  randomeProduct2: any = []
  randomeProduct3: any = []
  imgCollection: Array<object> = []
  imgCollectionLaptop: Array<object> = []
  imgCollectionfser: Array<object> = []
  private subscriptionses: Subscription[] = [];
  isLogged: boolean = false;
  errorgetproduct: string='';
  constructor(
    private userAuth:UserAuthService,
    private prdApiServ: ProductApiService,
    private prdServ: ProductService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.isLogged = this.userAuth.isLoggedIn
    let subscription: Subscription = this.prdApiServ.GetAllProduct().subscribe(productele => {
      this.products = productele
      this.randomeProductAll = productele
console.log(" this.products", this.products)



for (let i = 0; i < this.fackproducts.length; i++) {
  let j = Math.floor(Math.random() * this.randomeProductAll.length);
  this.randomeProductAll.push(this.fackproducts[j]);

}

      for (let i = 0; this.randomeProduct.length < 3; i++) {
        let j = Math.floor(Math.random() * this.randomeProductAll.length)
        if (!(this.randomeProduct.includes(this.randomeProductAll[j]))) {
          this.randomeProduct.push(this.randomeProductAll[j]);
        }
        //  this.randomeProductAll.splice(j,1);
      }

      for (let i = 0; this.randomeProduct2.length < 3; i++) {
        let j = Math.floor(Math.random() * this.randomeProductAll.length)
        if (!(this.randomeProduct2.includes(this.randomeProductAll[j]))) {
          this.randomeProduct2.push(this.randomeProductAll[j]);
        }
        //  this.randomeProductAll.splice(j,1);
      }

      for (let i = 0; this.randomeProduct3.length < 3; i++) {
        let j = Math.floor(Math.random() * this.randomeProductAll.length)
        if (!(this.randomeProduct3.includes(this.randomeProductAll[j]))) {
          this.randomeProduct3.push(this.randomeProductAll[j]);
        }
        //  this.randomeProductAll.splice(j,1);
      }





      //product computer
      this.products.forEach(element => {
        if (element?.category == "Electronics"||element?.arcategory == "الكترونيات") {
          this.electronicCategoryptoduct.push(element)
        }
      });

      // console.log(" this.electronicCategoryptoduct", this.electronicCategoryptoduct)


      // for (let i = 0; this.randomeProductElectronic.length <=3; i++) {
      //   let j = Math.floor(Math.random() * this.electronicCategoryptoduct.length)
      //   if (!(this.randomeProductElectronic.includes(this.electronicCategoryptoduct[j]))) {
      //     this.randomeProductElectronic.push(this.electronicCategoryptoduct[j]);
      //   }}

      // // for (let i = 0; i <= 3; i++) {
      // //   let j = Math.floor(Math.random() * this.electronicCategoryptoduct.length);
      // //   this.randomeProductElectronic.push(this.electronicCategoryptoduct[j]);
      // // }

      // //lab
      this.products.forEach(element => {
        if (element.category == "Fashion"||element.arcategory == "ازياء") {
          this.FashionCategoryptoduct.push(element)
        }
      });
      //  console.log("this.FashionCategoryptoduct",this.FashionCategoryptoduct)

      // for (let i = 0; this.randomeProductFashion.length <=3; i++) {
      //   let j = Math.floor(Math.random() * this.FashionCategoryptoduct.length)
      //   if (!(this.randomeProductFashion.includes(this.FashionCategoryptoduct[j]))) {
      //     this.randomeProductFashion.push(this.FashionCategoryptoduct[j]);
      //   }}

      // // for (let i = 0; i <= 3; i++) {
      // //   let j = Math.floor(Math.random() * this.FashionCategoryptoduct.length);
      // //   this.randomeProductFashion.push(this.FashionCategoryptoduct[j]);
      // //   //  this.FashionCategoryptoduct.splice(j,1);
      // // }



      ///acsses
      this.products.forEach(element => {
        if (element?.category == "Grocery"||element?.arcategory == "بقاله") {
          this.GroceryCategoryptoduct.push(element)
        }
      });

      // for (let i = 0; this.randomeProductGrocery.length <=3; i++) {
      //   let j = Math.floor(Math.random() * this.GroceryCategoryptoduct.length)
      //   if (!(this.randomeProductGrocery.includes(this.GroceryCategoryptoduct[j]))) {
      //     this.randomeProductGrocery.push(this.GroceryCategoryptoduct[j]);
      //   }}


      // for (let i = 0; i <= 3; i++) {
      //   let j = Math.floor(Math.random() * this.GroceryCategoryptoduct.length);
      //   this.randomeProductGrocery.push(this.GroceryCategoryptoduct[j]);
      //   //  this.GroceryCategoryptoduct.splice(j,1);
      // }

      this.products.forEach(element => {
        // if(element.category=="Fashion"||element.arcategory == "ازياء")
        this.imgCollection.push({
          image: this.imgurl + element.imagePath[0],
          thumbImage: this.imgurl + element.imagePath[0]
        })
      });


      this.products.forEach(element => {
        if(element.subcategory =="Labtops")
      {  
        
        this.imgCollectionLaptop.push({
          image: this.imgurl + element.imagePath[0],
          thumbImage: this.imgurl + element.imagePath[0]
        })
      }
      });


      // console.log('lklk', this.sliderimg)



    }, err => {
      // this.errorgetproduct= err.error.message
      console.log(err)
    })
    this.subscriptionses.push(subscription);



  }
  ngOnDestroy() {
    for(let sub of this.subscriptionses)
    sub.unsubscribe();
  }
  }