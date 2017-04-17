import { Component } from '@angular/core';
// import { transition, style, animate, state, trigger } from '@angular/animations';

import {HttpService} from '../app.service';
@Component({

  selector: 'collect',  // <home></home>

  templateUrl: './collect.component.html',
  animations: [

  ]
})
export class CollectComponent {

	private getListApi = 'recordings/search';

	showModal = false;
	message;
	showMsg = false;
	msgTime = 3000;
	isSubmit = false;
	list;

	isMore = false;

	params = {
		//user: 'D88A728E-89CA-E311-A4DE-F01FAFD0F1FD',
		key: '',
		fav: true,
		offset: 1,
		max: 5
	};

	constructor(private http: HttpService){
	    
	}

	ngOnInit(){
		this.getList();
	}

	clear(){
		this.params = {
			//user: 'D88A728E-89CA-E311-A4DE-F01FAFD0F1FD',
			key: '',
			fav: true,
			offset: 1,
			max: 5
		};
		this.list = null;
	}


	getList(){
		this.http.getData(this.getListApi, this.params)

	    .then((res) => {
	        if(res && res.length > 0){
	    		this.isMore = true;
	    		this.list = this.list ? this.list.concat(res) : res;
	    	}
	        else{
	        	this.isMore = false;
	        }
	    })
	    .catch(res => {
	    	this.message = '获取数据失败';
	    	this.showMsg = true;
	    	//this.ref.
	    	setTimeout(() => {this.showMsg = false; }, this.msgTime);
	    });
	}

	loadMore(){
		if(this.isMore){
			this.params.offset++;
			this.getList();
		}
		
	}

	toggleModal(e?){
		e && e.stopPropagation();
	    this.showModal = !this.showModal;
	}

}
