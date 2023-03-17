import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { IUser } from 'src/app/View Model/iuser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  // phonePattern = "[0-9]";
  namePattern = "[A-Za-z]{3,30}";
  passwordPattern = "^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[*.!@$%^&(){}[]:;,.?/~_+-=|\]).{8,32}$";
  number="(01)[0-9]{9}";
  currentLang: string;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: UserAuthService,
    private router: Router
    ,public translate:TranslateService,
    ) { this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang)
    this.form = this.fb.group({
      name:['',[Validators.required,  Validators.pattern(this.namePattern)]],
      email:['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      phone:['', [Validators.required,Validators.pattern(this.number)]],
      password:['',[Validators.required,Validators.minLength(7)]]
    })
  }

  ngOnInit(): void {
  }
  signup(): void {
    const user:IUser ={
      name:this.form.controls['name'].value,
      email:this.form.controls['email'].value,
      phone:this.form.controls['phone'].value,
      password:this.form.controls['password'].value,
    }
    console.log("in si c")
    this.authService.signup(user).subscribe(data => {
      this.toastr.success(`${user.name}, Your're Signup Successfully..`);
      this.router.navigate(['/User/login'])
    },(err)=>{
      this.toastr.error(err);

    })
  }

}
