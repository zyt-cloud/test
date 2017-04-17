/**
** author zyt
**
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datetime'})
export class DateTimePipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        
        let date = new Date(value);

        let y = date.getUTCFullYear();
        let M = date.getUTCMonth() + 1;
        let d = date.getUTCDate();

        let h = date.getUTCHours();
        let m = date.getUTCMinutes();
        let s = date.getUTCSeconds();

        return y + '-' + (M < 10 ? '0' + M : M) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);

    }
}