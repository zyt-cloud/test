/**
 * 阻止冒泡指令
 * author zyt
 **/
import { Directive, HostListener } from '@angular/core';


@Directive({
    selector: '[stop-bubble]'
})
export class StopBubbleDirective {

    @HostListener('click', ['$event']) onMouseClick(e){
        e.stopPropagation();
    }
   
}