import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { IUser } from 'src/app/View Model/iuser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[*.!@$%^&(){}[]:;,.?/~_+-=|\]).{8,32}$";
  currentLang: string;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private authService: UserAuthService
    ,public translate:TranslateService,
    private _authService: SocialAuthService
  ) { 
    this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang)
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required,Validators.minLength(7)]]
    })
  }

  ngOnInit(): void {
  }

  login(): void {
    const user:IUser ={
      email:this.form.controls['email'].value,
      password:this.form.controls['password'].value,
    } 
    const _user = this.authService.signIn(user)
    if(_user?.name){
      this.toastr.success('Hello, again'+_user?.name,'',{
        positionClass: 'toast-top-left'
      });
    }
  }
  signInWithGoogle(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=>{
      const {name,email}=data
      if(data){
        // const _data = this.authService.googleSignIn({email})
        // if(_data?.name){
        //   this.toastr.success('Hello, again'+_data?.name);
        // }
        // if(!_data){
          this.authService.googleSignup({email,name}).subscribe(res=>{
            if(res || res.message =='user is exist'){
              this.authService.googleSignIn({email})
            }else{
              this.toastr.error('Somthing Wrong....');
            }
          })
          // this.authService.googleSignIn({email})
        // }
      }
    })
  }

  signOut(): void {
    this._authService.signOut();
  }


  showPassword = false;
 togglePassword () {
      this.showPassword = !this.showPassword

 }



}
