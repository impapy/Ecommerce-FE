import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currency.pipe';
import { EgPricePipe } from './eg-price.pipe';



@NgModule({
  declarations: [
    CurrencyPipe,
    EgPricePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyPipe
  ]
})
export class SharedModule { }
