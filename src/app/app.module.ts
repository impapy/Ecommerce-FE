import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './Component/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Component/home/home.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductModule } from './Component/product/product.module';
import { CategoryModule } from './Component/category/category.module';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaymentMethodComponent } from './Component/payment-method/payment-method.component';
import { OrderComponent } from './Component/order/order.component';
import { ShippingInfoComponent } from './Component/shipping-info/shipping-info.component';
import { CartComponent } from './Component/cart/cart.component';
import { EGYToUSAPipe } from './Pipe/egyto-usa.pipe';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OrderModule } from './Component/order/order.module';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ForgetPassComponent } from './Component/forget-pass/forget-pass.component';
import { AuthInterceptorProvider } from './auth.interceptor';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    PaymentMethodComponent,
    ShippingInfoComponent,
    CartComponent,
    WishlistComponent,
    ForgetPassComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    ProductModule,
    CategoryModule,
    NgxPaginationModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    }),
    OrderModule,
    NgxSpinnerModule
    // MatSliderModule,
    ,SocialLoginModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthInterceptorProvider,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '138339430273-gbce0u6p3tp2e12ab4tl6gek71nu18ru.apps.googleusercontent.com'
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function createTranslateLoader(http:HttpClient)
{
  return new TranslateHttpLoader(http,'./assets/i18n/','.json')
}
