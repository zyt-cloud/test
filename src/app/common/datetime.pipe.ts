/**
** author zyt
**
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datetime'})
export class DateTimePipe implements PipeTransform {
    transform(value: any, args: string[]): any {

        if(!value) return '';
        
        let date = new Date(value);

        /*let y = date.getUTCFullYear();
        let M = date.getUTCMonth() + 1;
        let d = date.getUTCDate();

        let h = date.getUTCHours();
        let m = date.getUTCMinutes();
        let s = date.getUTCSeconds();*/
        let y = date.getFullYear();
        let M = date.getMonth() + 1;
        let d = date.getDate();

        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();

        return y + '-' + (M < 10 ? '0' + M : M) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);

    }
}