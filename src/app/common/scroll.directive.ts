/**
 * 模态框指令指令
 * author zyt
 * Example: <div scroll (loadMore)="loadMore"></div>
 **/
import { Directive, ElementRef, Input, Output, OnInit, OnChanges, SimpleChanges,EventEmitter} from '@angular/core';

declare var $: any;


@Directive({
    selector: '[scroll]'
})
export class ScrollDirective {

	/*@Input() isMore;*/

    @Output() loadMore = new EventEmitter();;

	$elem;

    constructor(private eleRef: ElementRef){
    	this.$elem = $(this.eleRef.nativeElement);
    }

    ngOnInit(){
    	this.$elem.scroll((e) => {

            let elem = e.target;

            if(elem.scrollTop + 2 >= (elem.scrollHeight - elem.offsetHeight)){
                this.loadMore.emit();
            }
        });
    }

    /*ngOnChanges(changes: SimpleChanges){

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
        
    }*/
   
}