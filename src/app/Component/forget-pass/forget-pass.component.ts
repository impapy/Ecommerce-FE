import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {
  messageEmail:string=''
  random!:string
  heden:string="Email"
  userEmail:string=''
  ErrorEmail:string=''
  ErrorCode:string=''
  // form:FormGroup;
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor( 
    private fb: FormBuilder,
    private ath:UserAuthService
    ,private router:Router) { }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
    // })

// this.ath.check()
  }

  checkEmail(email:any){
    this.userEmail=email
    this.ath.check(email).subscribe(e=>{
      console.log(e)
this.messageEmail=e

if(e.success)
{
  this.random = e.code
  this.heden='Code'

  console.log(this.random,"an")
}else{
  this.heden='Email'
this.ErrorEmail="this is wrong Email"
}


    })

  }

  code(code:any)
  {
    if(code==this.random)
    {
      // console.log(this.random,"co",this.userEmail)
      this.heden='Change'
    }else{
  this.heden='Code'
this.ErrorCode='this is wrong Code'
    }

  }


  Change(Pass:any)
  {
    this.ath.HangePass(this.userEmail,Pass,Pass).subscribe(done=>{
      this.router.navigate(['/User/login'])
    })
  }

}
