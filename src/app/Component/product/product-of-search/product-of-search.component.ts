import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ProductApiService } from "src/app/Services/product/product-api.service";
import { IProduct } from "src/app/View Model/iproduct";
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-product-of-search',
  templateUrl: './product-of-search.component.html',
  styleUrls: ['./product-of-search.component.scss']
})
export class ProductOfSearchComponent implements OnInit {

  Products:IProduct[] = [];
  ImgURL = environment.APIURL + "/";
  subCate:string ="";
  currentLang: string;
  filterprod: IProduct[] = [];
  brands:any[]=[]
  page: number = 1;  
  allFilter:any={
    price:0,
    rating:0,
    brand:"",
  module:"",
  count:''
  }
valOfSearch:any;
// =============================
toggleItemVal: number = 5;
toggleItemVal_2: number = 0;

toggleItembol: boolean = false;

  constructor(
    private prdApiService:ProductApiService,    
    public translate:TranslateService,
    private spinner: NgxSpinnerService
    ) { this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang)
  }

  ngOnInit(): void {
    this.spinner.show();
    this.prdApiService.on<string>().subscribe(data=>{
      this.valOfSearch=data
      console.log("search",this.valOfSearch);
      
    })





    this.prdApiService.getAllProductsOfSearch().subscribe(ele => {
      this.filterprod = ele
      this.Products = ele;
      console.log(this.Products)


      /////filter brand
      this.filterprod.forEach(e=>{
        this.brands.push(e.brand)
})

this.brands= [...new Set(this.brands)];
    })
  }  
  num:number=0;
  showpop(item:number){
    if(this.page>=2){
      item = (item+(8*(this.page-1)))
    }
    this.num=item;
  }
  filternew(event:any){


    if(event.target.name=="stock")
    {
      this.allFilter.count=event.target.value
    }
    if(event.target.name=="ratings")
    {
      this.allFilter.rating=event.target.value
      if(event.target.value=='')
      {
        this.allFilter.rating=0
      }
    }
    if(event.target.name=="prices")
    {
      this.allFilter.price=event.target.value
    }
    if(event.target.name=="model")
    {
      this.allFilter.module=event.target.value
    }
    if(event.target.name=="brands")
    {
      this.allFilter.brand=event.target.value
    }
    
    //all
    if(this.allFilter.price==0&&this.allFilter.rating==0&&this.allFilter.brand==''&&this.allFilter.count=='')
    {
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      this.Products=all
    })
    }
    
    //all brand only
    
    if(this.allFilter.price!=0&&this.allFilter.rating!=0&&this.allFilter.brand==''&&this.allFilter.count!='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.price < this.allFilter.price && e.ratings<=this.allFilter.rating
          && e.countInStock== this.allFilter.count){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    //all brand and price
    
    if(this.allFilter.price==0&&this.allFilter.rating!=0&&this.allFilter.brand==''&&this.allFilter.count!='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if(  e.ratings>=this.allFilter.rating
          && e.countInStock== this.allFilter.count){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    
    //all brand && ratings
    
    if(this.allFilter.price!=0&&this.allFilter.rating==0&&this.allFilter.brand==''&&this.allFilter.count!='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.price < this.allFilter.price && e.countInStock== this.allFilter.count){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    //all brand && instock
    
    if(this.allFilter.price!=0&&this.allFilter.rating!=0&&this.allFilter.brand==''&&this.allFilter.count=='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
       if( e.price < this.allFilter.price &&e.ratings>=this.allFilter.rating){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    // all brand & price & rating
    if(this.allFilter.price==0&&this.allFilter.rating==0&&this.allFilter.brand==''&&this.allFilter.count!='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.countInStock== this.allFilter.count){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    
    //all brand && rating && stock
    if(this.allFilter.price!=0&&this.allFilter.rating==0&&this.allFilter.brand==''&&this.allFilter.count=='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.price< this.allFilter.price){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    //all brand && price && stock
    if(this.allFilter.price==0&&this.allFilter.rating!=0&&this.allFilter.brand==''&&this.allFilter.count=='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.ratings  >= this.allFilter.rating){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    
    //all price only
    
    if(this.allFilter.price==0&&this.allFilter.rating!=0&&this.allFilter.brand!=''&&this.allFilter.count!='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.brand==this.allFilter.brand && e.ratings<=this.allFilter.rating
          && e.countInStock== this.allFilter.count){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    //all price && rating
    
    if(this.allFilter.price==0&&this.allFilter.rating==0&&this.allFilter.brand!=''&&this.allFilter.count!='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.brand==this.allFilter.brand
          && e.countInStock== this.allFilter.count){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    //all price && stock
    
    if(this.allFilter.price==0&&this.allFilter.rating!=0&&this.allFilter.brand!=''&&this.allFilter.count=='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.brand==this.allFilter.brand
        && e.ratings<=this.allFilter.rating){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    //all price && rating && stock
    
    if(this.allFilter.price==0&&this.allFilter.rating==0&&this.allFilter.brand!=''&&this.allFilter.count=='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if( e.brand==this.allFilter.brand){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    
    // all rating only
    
    if(this.allFilter.price!=0&&this.allFilter.rating==0&&this.allFilter.brand!=''&&this.allFilter.count!='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if(e.price < this.allFilter.price && e.brand==this.allFilter.brand && e.ratings>=this.allFilter.rating){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    // all rating & stock
    
    if(this.allFilter.price!=0&&this.allFilter.rating==0&&this.allFilter.brand!=''&&this.allFilter.count=='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if(e.price < this.allFilter.price && e.brand==this.allFilter.brand){ this.Products.push(e)}
      }
    
      )
    })
    }
    
    // all stock
    
    if(this.allFilter.price!=0&&this.allFilter.rating!=0&&this.allFilter.brand!=''&&this.allFilter.count=='')
    {
      this.Products = []
    this.prdApiService.getAllProductsOfSearch().subscribe(all=>{
      all.filter(e=>{
        if(e.countInStock<1){e.countInStock=0}else{e.countInStock=1}
       if(e.price < this.allFilter.price && e.brand==this.allFilter.brand
        && e.ratings>=this.allFilter.rating){ this.Products.push(e)}
      }
    
      )
    })
    }
 
    
    
      }



      toggleItem() {
      if(this.toggleItemVal==this.brands.length){
        this.toggleItembol = !this.toggleItembol;}
        if (!this.toggleItembol) {
          this.toggleItemVal_2=this.toggleItemVal
          this.toggleItemVal+=5;
        } else { this.toggleItemVal_2=0
          this.toggleItemVal = 5;
        }
      }



}