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

	params = {
		//user: 'D88A728E-89CA-E311-A4DE-F01FAFD0F1FD',
		key: '',
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
			offset: 1,
			max: 5
		};
	}


	getList(){
		this.http.getData(this.getListApi, this.params)

	    .then((res) => {
	        this.list = res

	    })
	    .catch(res => {
	    	console.log('error:' + res)
	    	this.message = '获取数据失败';
	    	this.showMsg = true;
	    	//this.ref.
	    	setTimeout(() => {this.showMsg = false; }, this.msgTime);
	    });
	}

	toggleModal(e?){
		e && e.stopPropagation();
	    this.showModal = !this.showModal;
	}

}
