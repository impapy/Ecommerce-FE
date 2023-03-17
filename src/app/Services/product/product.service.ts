import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/View Model/iproduct';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[] = [];
  fackproducts: IProduct[] = this.products.slice()
  productsAllArray: any = [];
  randomeProduct: any = [];
  computerCategoryptoduct: any = [];
  randomeProductcomputer: any = [];
  subscriptions = []
  randomeProductAll: IProduct[] = [];
  labCategoryptoduct: any = []
  randomeProductlab: any = []
  AccessoriesCategoryptoduct: any = []
  randomeProductAccessories: any = []
  sliderimg: Array<object> = [];
  im: string = ""
  constructor(
    private http: HttpClient,
    private productApiServ: ProductApiService
  ) {
    this.productApiServ.GetAllProduct().subscribe(productele => {
      this.products = productele
      this.randomeProductAll = productele

      console.log('product', this.products[1].imagePath[0])
      this.im = this.products[1].imagePath[0]

      //three randome for allproduct
      for (let i = 0; i <= 2; i++) {
        let j = Math.floor(Math.random() * (i + 1))
        this.randomeProduct.push(this.products[j]);
      }

      // randome for allproduct
      for (let i = 0; i < this.fackproducts.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        this.randomeProductAll.push(this.fackproducts[j]);
      }

      //product computer
      this.products.forEach(element => {
        if (element.category == "computer") {
          this.computerCategoryptoduct.push(element)
        }
      });

      //for randome fol computer category
      for (let i = 0; i <= 3; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        this.randomeProductcomputer.push(this.computerCategoryptoduct[j]);
        this.computerCategoryptoduct.splice(j, 1);
      }

      //lab
      this.products.forEach(element => {
        if (element.category == "lab") {
          this.labCategoryptoduct.push(element)
        }
      });

      for (let i = 0; i <= 3; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        this.randomeProductlab.push(this.labCategoryptoduct[j]);
        this.labCategoryptoduct.splice(j, 1);
      }

      ///acsses
      this.products.forEach(element => {
        if (element.category == "Accessories") {
          this.AccessoriesCategoryptoduct.push(element)
        }
      });

      for (let i = 0; i <= 3; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        this.randomeProductAccessories.push(this.AccessoriesCategoryptoduct[j]);
        this.AccessoriesCategoryptoduct.splice(j, 1);
      }

      this.products.forEach(element => {
        this.sliderimg.push({ image: element.imagePath[0] })
      });

      console.log('lklk', this.sliderimg)

    }, err => {
      console.log(err)
    })

  }



}
