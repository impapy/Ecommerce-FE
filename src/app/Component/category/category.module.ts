import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes:Routes = [
  {path:'cate/:cate', component: CategoryComponent}
]

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,NgxPaginationModule,SharedModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true
    }),
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
