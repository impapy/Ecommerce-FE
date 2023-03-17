import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './Component/cart/cart.component';
import { ForgetPassComponent } from './Component/forget-pass/forget-pass.component';
import { HomeComponent } from './Component/home/home.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
// import { OrderComponent } from './Component/order/order.component';
import { PaymentMethodComponent } from './Component/payment-method/payment-method.component';
import { ShippingInfoComponent } from './Component/shipping-info/shipping-info.component';
import { UserAuthGuard } from './Component/user/user-auth.guard';
import { WishlistComponent } from './Component/wishlist/wishlist.component';

const routes: Routes = [
  {path:'', redirectTo:'/Home', pathMatch:'full'},
  {path:'Home', component: HomeComponent},
  {path:'ForPass', component: ForgetPassComponent},
  {
    path: 'User',
    loadChildren: () => import('./Component/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'Product',
    loadChildren: () => import('./Component/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'Category',
    loadChildren: () => import('./Component/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'Order',
    loadChildren: () => import('./Component/order/order.module').then(m => m.OrderModule)
  },
  {path:'Cart', component: CartComponent,canActivate:[UserAuthGuard]},
  {path:'Shipping', component: ShippingInfoComponent,canActivate:[UserAuthGuard]},
  {path:'Payment', component: PaymentMethodComponent,canActivate:[UserAuthGuard]},
  {path:'Wishlist', component: WishlistComponent,canActivate:[UserAuthGuard]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
