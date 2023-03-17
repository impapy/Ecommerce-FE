import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-for-sale',
  templateUrl: './products-for-sale.component.html',
  styleUrls: ['./products-for-sale.component.scss']
})
export class ProductsForSaleComponent implements OnInit {
  currentLang: string;
  Products:IProduct[] = [];
  ImgURL = environment.APIURL + "/";
  page: number = 1; 
  constructor(
    private prdApiService:ProductApiService,    
    public translate:TranslateService,
    private spinner: NgxSpinnerService

    ) { this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang)
  }

  ngOnInit(): void {
      this.spinner.show();
    this.prdApiService.getAllProductsOfSearch().subscribe(ele => {
ele.map((item)=>{
if(item.discount!=0){
this.Products.push(item)
}})

      // this.Products =ele;



    })

  }
  num:number=0;
  showpop(item:number){
    if(this.page>=2){
      item = (item+(8*(this.page-1)))
    }
    this.num=item;
  }
}
