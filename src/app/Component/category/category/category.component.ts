import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/Services/category/category.service';
import { ProductApiService } from 'src/app/Services/product/product-api.service';
import { ICategory } from 'src/app/View Model/icategory';
import { IProduct } from 'src/app/View Model/iproduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  cate:string="";
  page: number = 1;  
  category!:ICategory;
  imageUrl = environment.APIURL+"/";
  Products:IProduct[] = [];
  currentLang: string;
  constructor(
    private catService:CategoryService,
    private activatedRoute: ActivatedRoute,
    private prdServe:ProductApiService,
    public translate:TranslateService,
    private spinner: NgxSpinnerService
  ) {this.currentLang=localStorage.getItem('current_lang')||'en';
  this.translate.use(this.currentLang)
    this.cate = String(this.activatedRoute.snapshot.paramMap.get('cate'))
    this.currentLang = localStorage.getItem('current_lang') as string
  }


  ngOnInit(): void {
    this.spinner.show();
    if(!localStorage.getItem('current_lang')){
      this.currentLang = 'en'
    }
    this.activatedRoute.paramMap.subscribe(
      (paramMap)=>{
        this.cate = String(paramMap.get('cate'))
        this.catService.getCategory(this.cate).subscribe(category => {
          this.category = category;
          console.log(this.category)
          if(this.currentLang == 'ar'){
            console.log(this.category.arName)
            this.prdServe.getProductsByCategory(this.category.name as string).subscribe(products => {
              this.Products = products;
            })
          }else{
            this.prdServe.getProductsByCategory(this.category.name as string).subscribe(products => {
              this.Products = products;
              console.log(this.Products)
            })
          }
        })
      },
      (err)=>{
        console.log(err)
      }
    )      
  }

  num:number=0;
  showpop(item:number){
    if(this.page>=2){
      item = (item+(12*(this.page-1)))
    }
    this.num=item;
  }
}
