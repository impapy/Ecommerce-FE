import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { UserAuthGuard } from '../user/user-auth.guard';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { OrderThanksComponent } from './order-thanks/order-thanks.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPayPalModule } from 'ngx-paypal';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {path:'order', component: OrderComponent,canActivate:[UserAuthGuard]},
  {path:'thank/:id', component: OrderThanksComponent,canActivate:[UserAuthGuard]},
  {path:'review/:id', component: OrderReviewComponent,canActivate:[UserAuthGuard]},
  {path:'cancel/:id', component: CancelOrderComponent,canActivate:[UserAuthGuard]},
]

@NgModule({
  declarations: [
    OrderComponent,
    OrderThanksComponent,
    OrderReviewComponent,
    CancelOrderComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    NgxPayPalModule,SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true
    }),
  ]
})
export class OrderModule { }
