/**
 * 返回指令
 * author zyt
 * Example: <a href="" page-back></a>
 **/
import { Directive, HostListener } from '@angular/core';

import { Location }                 from '@angular/common';


@Directive({
    selector: '[page-back]'
})
export class BackDirective {

    constructor(private location: Location){}

    @HostListener('click') onMouseClick(){
        this.location.back();
    }
   
}