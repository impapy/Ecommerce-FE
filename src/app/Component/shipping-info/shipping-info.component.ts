import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/Services/address/address.service';
import { ShippingService } from 'src/app/Services/shipping/shipping.service';
import { Iaddress } from 'src/app/View Model/iaddress';
import { IShippingInfo } from 'src/app/View Model/ishipping-info';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent implements OnInit {
  ctryId:string = ""
  defaultAdr!:Iaddress;
  govId:string = ""
  Countries:any = []
  Govs:any = []
  Cities:any = []
  shippingAddress = {
    country: "Egypt",
    city: "Qus",
    phone:"01120478786",
    governate: "Qena"
  } as IShippingInfo
  shippingForm:FormGroup;

  countryname = "[A-Za-z]{1,20}";
  fullname = "/^[a-zA-Z]+ [a-zA-Z]+$/";
  number="(01)[0-9]{9}"
  constructor(
    private shippingServ:ShippingService,
    private addserve:AddressService,
    public fb: FormBuilder) {
      this.shippingForm= this.fb.group({
        countryName:['',[Validators.required]],
        fullName:['',[Validators.required]],
        phone:['',[Validators.required]],
        governate:['',[Validators.required]],
        city:['',[Validators.required]]
      })

    }

  ngOnInit(): void {
    this.addserve.getCountries().subscribe(countries=> {
      // console.log("countries", countries)
      this.Countries = countries.map(country=>country)
      console.log("countries", this.Countries)
    })
    this.addserve.getDefaultAddress().subscribe(data=>{
      console.log("defuiiiii",data)
      this.defaultAdr = data;
    })
  }
  onChangeCountry(event:any) {
    const countryName = event.target.value
    // console.log(countryName)
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
    console.log("from shi c: ",this.shippingForm.value)
    this.shippingServ.setShippingAddress(this.shippingForm.value)
  }
  useDefault(){
    let adr= {
      country:this.defaultAdr.country ,
      fullName:this.defaultAdr.userId.name,
      phone:this.defaultAdr.userId.phone,
      governate:this.defaultAdr.governate,
      city:this.defaultAdr.city
    }
    this.shippingServ.setShippingAddress(adr)
  }
}