import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eGYToUSA'
})
export class EGYToUSAPipe implements PipeTransform {

  transform(value: number, currRate: number=15): unknown {
    var newPrice = (value/currRate).toFixed(2) 
    return newPrice;
  }

}
