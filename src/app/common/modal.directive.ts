/**
 * 模态框指令指令
 * author zyt
 * Example: <div dhb-modal [toggle]="isShow"></div>
 **/
import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

declare var $: any;


@Directive({
    selector: '[dhb-modal]'
})
export class DHBModalDirective {

	@Input() toggle;

	$elem

    constructor(private eleRef: ElementRef){
    	this.$elem = $(this.eleRef.nativeElement);
    }

    ngOnInit(){
    	if(this.toggle){

    		this.$elem.removeClass('hide');

    		setTimeout(() => {
	          this.$elem.addClass('in');
	        }, 30);
    	}
    	else{
    		this.$elem.removeClass('in');

    		setTimeout(() => {
	          this.$elem.addClass('hide');
	        }, 130);
    	}
    }

    ngOnChanges(changes: SimpleChanges){

        for (let propName in changes) {

            let chng = changes[propName];

            if(propName === 'toggle'){
            	if(chng.currentValue){
            		this.$elem.removeClass('hide');

		    		setTimeout(() => {
			          this.$elem.addClass('in');
			        }, 30);
            	}
                else{
                	this.$elem.removeClass('in');
    		
		    		setTimeout(() => {
			          this.$elem.addClass('hide');
			        }, 150);
                }
            }
            
        }
        
    }
   
}