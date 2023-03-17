import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { IUser } from './../../../View Model/iuser';
import { ProfileApiService } from './../../../Services/profile/profile-api.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/localStorageService/local-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  currentLang: string;
  User: IUser = {};
  UserID: any;
  checkPassword: boolean = false;
  checkEmailData: boolean = false;
  // private userNameStore = new BehaviorSubject<string>("");
  // public userName$ = this.userNameStore.asObservable();
  data: any;
  userName = ''
  public subscriptions: Subscription[] = [];
  constructor(
    private userService: UserAuthService,
    public translate: TranslateService,
    private profileApiSer: ProfileApiService,
    public router:Router,
    private storageService:LocalStorageService
  ) {
    this.currentLang = localStorage.getItem('current_lang') || 'en';
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {
    // this.storageService.watchStorage().subscribe((data:string) => {
    //   console.log(data);
    //   this.userName = localStorage.getItem('name') as string;
    //   // this will call whenever your localStorage data changes
    //   // use localStorage code here and set your data here for ngFor
    //   })
    let sub1 = this.userService.userName$.subscribe((userName) => {
      const user = JSON.parse(localStorage.getItem('user') as string);
      this.UserID = user._id;
      console.log("UserID",this.UserID , user._id);
    });

    this.subscriptions.push(sub1);

    let sub2 = this.profileApiSer.getUserByID(this.UserID).subscribe((user) => {
      
      this.User = user;
      console.log('546546546', user);
    });

    this.subscriptions.push(sub2);
  }

  changeName(val: string, valid: any, btn: any) {
    if (val.length < 4) {
      valid.classList.remove('d-none');
      valid.classList.add('d-block');
    } else {
      this.User.name = val;
      valid.classList.remove('d-block');
      valid.classList.add('d-none');
    }
  }

  validDataEmail(email: string) {
    const re = 
     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  changeEmail(val: string, valid: any) {
    let ChValid = this.validDataEmail(val);

    let sub5 = this.profileApiSer.checkEmail(val).subscribe((data) => {
      this.checkEmailData = data.success;

      console.log('check', this.checkEmailData);
    });

    if (ChValid && this.checkEmailData) {
      this.User.email = val;
    } else {
      valid.classList.remove('d-none');
      valid.classList.add('d-block');
    }
  }

  validDataPhone(phone: string) {
    const re = /^01[0-2]\d{1,8}$/;
    return re.test(phone);
  }
  changePhone(val: string, valid: any) {
    let ChValid = this.validDataPhone(val);
    if (ChValid) {
      this.User.phone = val;

      valid.classList.remove('d-block');
      valid.classList.add('d-none');
    } else {
      valid.classList.remove('d-none');
      valid.classList.add('d-block');
    }
  }

  validDataPassword(str:string)
  {
    
    var re = /(?=.*[A-Z])(?=.[a-z])(?=.*[0-9]).{6,20}/;
    return re.test(str);
  }

  changePassword(val: string, valid: any) {  
    let ChValid = this.validDataPassword(val);
      console.log(ChValid);
    if (ChValid) {
    this.User.password = val;

    this.checkPassword = true;   
    valid.classList.remove('d-block');
    valid.classList.add('d-none');
  } else {
    valid.classList.remove('d-none');
    valid.classList.add('d-block');
  }
}

  changeAlldate() {
    if (this.checkPassword) {
      let sub3 = this.profileApiSer
        .updateUser(this.UserID, this.User)
        .subscribe((data) => {
          console.log('data after check password', data);
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(data))
          this.storageService.removeItem('name')
          this.storageService.setItem('name',data.name)
          const name = data.name
          this.userService.userNameStore.next(name as string);
          this.router.navigate(['User/profile'])
        });
      this.subscriptions.push(sub3);
    } else {
      this.data = {
        name: this.User.name,
        phone: this.User.phone,
        email: this.User.email,
      };
      let sub4 = this.profileApiSer
        .updateUser(this.UserID, this.data)
        .subscribe((data) => {
          console.log('date if not checkpassword..', data);
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(data))
          const name = data.name
          this.userService.userNameStore.next(name as string);
          this.storageService.removeItem('name')
          this.storageService.setItem('name',data.name)
          this.router.navigate(['User/profile'])
        });

      this.subscriptions.push(sub4);
    }
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) sub.unsubscribe();
  }
}