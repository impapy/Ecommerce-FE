import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductsOfSubCateComponent } from './products-of-sub-cate/products-of-sub-cate.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ProductOfSearchComponent } from './product-of-search/product-of-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EGYToUSAPipe } from 'src/app/Pipe/egyto-usa.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsForSaleComponent } from './productsForSale/products-for-sale/products-for-sale.component';


const routes:Routes = [
  {path:"products-subcategory/:subcat",component:ProductsOfSubCateComponent},
  {path:":Id",component:ProductComponent},
  {path:"of/search",component:ProductOfSearchComponent},
  {path:"of/sale",component:ProductsForSaleComponent}

]

@NgModule({
  declarations: [
    ProductComponent,
    ProductsOfSubCateComponent,
    ProductOfSearchComponent,
    ProductsForSaleComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
        ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true
    }),
    // SharedModule
  ]
})
export class ProductModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../assets/i18n/', '.json');
}
