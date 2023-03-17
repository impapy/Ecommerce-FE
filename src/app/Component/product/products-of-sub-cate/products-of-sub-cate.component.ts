import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-of-sub-cate',
  templateUrl: './products-of-sub-cate.component.html',
  styleUrls: ['./products-of-sub-cate.component.scss'],
})
export class ProductsOfSubCateComponent implements OnInit {
  page: number = 1;
  Products: IProduct[] = [];
  ImgURL = environment.APIURL + '/';
  subCate: string = '';
  currentLang: string;
  filterprod: IProduct[] = [];
  brands: any[] = [];
  allFilter: any = {
    price: 0,
    rating: 0,
    brand: '',
    module: '',
    count: '',
  };
  constructor(
    private prdApiService: ProductApiService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
  ) {
    this.currentLang = localStorage.getItem('current_lang') || 'en';
    this.translate.use(this.currentLang);
    this.subCate = String(this.activatedRoute.snapshot.paramMap.get('subcat'));
  }

  ngOnInit(): void {
    this.spinner.show();

    this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((ele) => {
      this.filterprod = ele;
      this.Products = ele;
      console.log(this.Products);

      /////filter brand
      this.filterprod.forEach((e) => {
        this.brands.push(e.brand);
      });

      this.brands = [...new Set(this.brands)];
    });
  }
  num: number = 0;
  showpop(item: number) {
    if (this.page >= 2) {
      item = item + 8 * (this.page - 1);
    }
    this.num = item;
  }
  filternew(event: any) {
    if (event.target.name == 'stock') {
      this.allFilter.count = event.target.value;
    }
    if (event.target.name == 'ratings') {
      this.allFilter.rating = event.target.value;
      if (event.target.value == '') {
        this.allFilter.rating = 5;
      }
    }
    if (event.target.name == 'prices') {
      this.allFilter.price = event.target.value;
    }
    if (event.target.name == 'model') {
      this.allFilter.module = event.target.value;
    }
    if (event.target.name == 'brands') {
      this.allFilter.brand = event.target.value;
    }

    //all
    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count == ''
    ) {
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        this.Products = all;
      });
    }

    //all brand only

    if (
      this.allFilter.price != 0 &&
      this.allFilter.rating != 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count != ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.price < this.allFilter.price &&
            e.ratings >= this.allFilter.rating &&
            e.countInStock == this.allFilter.count
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    //all brand and price

    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating != 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count != ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.ratings >= this.allFilter.rating &&
            e.countInStock == this.allFilter.count
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    //all brand && ratings

    if (
      this.allFilter.price != 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count != ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.price < this.allFilter.price &&
            e.countInStock == this.allFilter.count
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    //all brand && instock

    if (
      this.allFilter.price != 0 &&
      this.allFilter.rating != 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count == ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (
            e.price < this.allFilter.price &&
            e.ratings >= this.allFilter.rating
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    // all brand & price & rating
    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count != ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (e.countInStock == this.allFilter.count) {
            this.Products.push(e);
          }
        });
      });
    }

    //all brand && rating && stock
    if (
      this.allFilter.price != 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count == ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (e.price < this.allFilter.price) {
            this.Products.push(e);
          }
        });
      });
    }

    //all brand && price && stock
    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating != 0 &&
      this.allFilter.brand == '' &&
      this.allFilter.count == ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (e.ratings >= this.allFilter.rating) {
            this.Products.push(e);
          }
        });
      });
    }

    //all price only

    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating != 0 &&
      this.allFilter.brand != '' &&
      this.allFilter.count != ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.brand == this.allFilter.brand &&
            e.ratings >= this.allFilter.rating &&
            e.countInStock == this.allFilter.count
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    //all price && rating

    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand != '' &&
      this.allFilter.count != ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.brand == this.allFilter.brand &&
            e.countInStock == this.allFilter.count
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    //all price && stock

    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating != 0 &&
      this.allFilter.brand != '' &&
      this.allFilter.count == ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.brand == this.allFilter.brand &&
            e.ratings >= this.allFilter.rating
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    //all price && rating && stock

    if (
      this.allFilter.price == 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand != '' &&
      this.allFilter.count == ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (e.brand == this.allFilter.brand) {
            this.Products.push(e);
          }
        });
      });
    }

    // all rating only

    if (
      this.allFilter.price != 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand != '' &&
      this.allFilter.count != ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.price < this.allFilter.price &&
            e.brand == this.allFilter.brand &&
            e.ratings >= this.allFilter.rating
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    // all rating & stock

    if (
      this.allFilter.price != 0 &&
      this.allFilter.rating == 0 &&
      this.allFilter.brand != '' &&
      this.allFilter.count == ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.price < this.allFilter.price &&
            e.brand == this.allFilter.brand
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    // all stock

    if (
      this.allFilter.price != 0 &&
      this.allFilter.rating != 0 &&
      this.allFilter.brand != '' &&
      this.allFilter.count == ''
    ) {
      this.Products = [];
      this.prdApiService.GetProductsBySubCate(this.subCate).subscribe((all) => {
        all.filter((e) => {
          if (e.countInStock < 1) {
            e.countInStock = 0;
          } else {
            e.countInStock = 1;
          }
          if (
            e.price < this.allFilter.price &&
            e.brand == this.allFilter.brand &&
            e.ratings >= this.allFilter.rating
          ) {
            this.Products.push(e);
          }
        });
      });
    }

    // this.Products = []
    // this.filterprod.forEach(e => {

    //   if (e.price < this.allFilter.price && e.ratings==this.allFilter.rating
    //     && e.brand==this.allFilter.brand && e.countInStock>= this.allFilter.count) {
    //     this.Products.push(e)
    //   }
    // })
  }
}
