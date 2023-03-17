import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/Services/address/address.service';
import { Iaddress } from 'src/app/View Model/iaddress';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  address!:Iaddress;
  ctryId:string = ""
  govId:string = ""
  Countries:any = []
  Govs:any = []
  Cities:any = []
  isdefault = false
  addressForm:FormGroup;
  countryname = "[A-Za-z]{1,20}";
  id:string="";
  constructor(
    private addserve:AddressService,
    public fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.addressForm= this.fb.group({
      country:['',[Validators.required]],
      fullName:['',[Validators.required]],
      phone:['',[Validators.required]],
      governate:['',[Validators.required]],
      city:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.addserve.getCountries().subscribe(countries=> {
      console.log("countries", countries)
      this.Countries = countries.map(country=>country)
    })
    this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.id = String(paramMap.get('id'));
        this.addserve.getUserAddress(this.id).subscribe(data=>{
          this.address = data;
          console.log(";;;;;",this.address);
        })
      })
  }
  onChangeCountry(event:any) {
    const countryName = event.target.value
    console.log(countryName)
    if (countryName) {
      this.addserve.getGovs(countryName).subscribe(
        data => {
          this.Govs = data;
          this.Cities = null;
        }
      );
    } else {
      this.Govs = null;
      this.Cities = null;
    }
  }
  onChangeGov(event:any) {
    const govId = event.target.value
    console.log(event.target.value)
    if (govId) {
      this.addserve.getCities(govId).subscribe(        
        data => {
          console.log(govId)
          this.Cities = data;
        }
      );
    } else {
      this.Cities = null;
    }
  }
  addAddress(){
    console.log("from shi c: ",this.addressForm.value)
    this.addserve.EditAddresses(this.addressForm.value,this.id).subscribe(data=>{
      console.log("Add..",data)
      this.toastr.success('Address was updated successfully..');
      this.router.navigate(['/User/user-address'])
    })
  }

}
