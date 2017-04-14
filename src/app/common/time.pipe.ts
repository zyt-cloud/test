/**
** author zyt
**
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myTime'})
export class TimePipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        
        let time = parseInt(value);

        let h = Math.floor(time / 3600);
        let m = Math.floor((time - h * 3600) / 60);
        let s = time - m * 60 - h * 3600;

        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);

    }
}