import { Pipe, PipeTransform } from '@angular/core';
import { UtilsHelper } from '../../app/helpers/utilsHelper';

@Pipe({
  name: 'real',
})
export class RealPipe implements PipeTransform {

  transform(value: number, ...args) {
    return UtilsHelper.number.formatCurrency(value);
  }
}
