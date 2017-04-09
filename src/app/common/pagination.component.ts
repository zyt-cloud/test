/**
 *  author: zyt
 *  Example:
 *  <pagination (setPage)="setPage($event)" 
 *   [count]="50" [pageSize]="30">
 *  </pagination>
 *
 */
import{ Component, ElementRef, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

// import * as $ from 'jquery';
// declare var $: any;

@Component({
    selector: 'pagination',
    template: `
        <div class="pagination">
            <ul class="paging-wrap clearfix">
                <li class="paging-item paging-count">共{{count}}条</li>
                <li class="paging-item" (click)="prePage()">上一页</li>
                <li class="paging-item page-curr">{{pageIndex + 1}}</li>
                <li class="paging-item" (click)="nextPage()">下一页</li>
            </ul>
        </div>
    `
    //templateUrl: './com-select.html'
})


export class PaginationComponent implements OnInit{

    @Input()
    pageSize;
    @Input()
    pageIndex;
    @Input()
    count;

    @Output()
    setPage = new EventEmitter();

    pageCount = 0;

    constructor(private elem: ElementRef){

    }

    ngOnChanges(changes: SimpleChanges){

        for (let propName in changes) {

            let chng = changes[propName];

            if(propName === 'count' && chng.currentValue){
                this.count = chng.currentValue;
                this.calPage();
            }
            
        }
        
    }

    calPage(){
        this.pageCount = Math.ceil(this.count / this.pageSize);
    }

    prePage(){
        if(parseInt(this.pageIndex) === 0){
            return;
        }
        this.pageIndex--;
        this.setPage.emit(this.pageIndex);
    }

    nextPage(){
        if(parseInt(this.pageIndex) === (this.pageCount - 1)){
            return;
        }
        this.pageIndex++;
        this.setPage.emit(this.pageIndex);
    }
    
    ngOnInit(){


    }
}