import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, currRate: number=15): string {
    var res=''
        var newPrice = (value/currRate).toFixed(1)
    //  var Lang =  localStorage.getItem('current_lang')||'en';
      var Curr=  localStorage.getItem('currency')||'USD';

    // {{Value|currency:"USD":"symbol"}}
    // {{Value|currency:"EGP":"symbol"}}
    if(Curr=="EGP"){
      newPrice=value.toFixed(1)
    res=`${newPrice} EGP`;}
    else{
      res=`${newPrice} $`;}



        return res;
      }

}
