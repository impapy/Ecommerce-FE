import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserAuthGuard } from './user-auth.guard';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

const routes:Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'profile', component: ProfileComponent,canActivate:[UserAuthGuard]},
  {path:'user-orders', component: UserOrdersComponent,canActivate:[UserAuthGuard]},
  {path:'user-address', component: UserAddressComponent,canActivate:[UserAuthGuard]},
  {path:'edit-profile', component:EditProfileComponent  ,canActivate:[UserAuthGuard]},
  {path:'add-address', component:AddAddressComponent  ,canActivate:[UserAuthGuard]},
  {path:'edit-address/:id', component:EditAddressComponent  ,canActivate:[UserAuthGuard]},
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    UserAddressComponent,
    UserOrdersComponent,
    EditProfileComponent,
    AddAddressComponent,
    EditAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
        TranslateModule.forChild({
      
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true
    })
  ]
})
export class UserModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../assets/i18n/', '.json');
}