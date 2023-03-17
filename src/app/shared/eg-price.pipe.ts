import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egPrice'
})
export class EgPricePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
