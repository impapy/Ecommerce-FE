import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/Services/Payment/payment.service';
import { ChoiceClass } from '../../View Model/choiceclass';


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {
  paymentForm:FormGroup;

  CashOnDelivery= {
      id:1,
      name:'Payment',
      value:'CashOnDelivery',
      label:'Cash on Delivery (COD) Pay by cash on delivery.. Learn more. Pay online for contactless deliveries.'
      ,
      labelAr:'الدفع نقدا عند الاستلام ادفع نقدا عند الاستلام.  ادفع عبر الإنترنت للتسليم بدون تلامس.'
    }
  
  PayPal= {
      id:2,
      name:'Payment',
      value:'PayPal',
      label:'PayPal',
      labelAr:'باي بال'
    }
  currentLang: string;

  constructor(private fs:FormBuilder, private payserv:PaymentService, private router:Router) { 
   
    this.currentLang=localStorage.getItem('current_lang')||'en';
   
    this.paymentForm = this.fs.group({
      paymentmethod: ['', [Validators.required]]
    })
  }
  //payment
  submit(){
    this.payserv.setPaymentMethod(this.paymentForm.value);
    console.log(this.paymentForm.value);
    
  }


}