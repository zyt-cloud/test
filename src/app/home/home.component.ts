import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { transition, style, animate, state, trigger } from '@angular/animations';

import {HttpService} from '../app.service';

@Component({

  selector: 'home',  // <home></home>

  templateUrl: './home.component.html',
  animations: [

  ]
})
export class HomeComponent {

	private getListApi = 'recordings/search';

	toChild = false;
	showModal = false;
	message;
	showMsg = false;
	msgTime = 3000;

	params = {
		user: 'D88A728E-89CA-E311-A4DE-F01FAFD0F1FD',
		kw: '',
		offset: 1,
		max: 5
	};

	constructor(private http: HttpService, private ref: ChangeDetectorRef,){
	    
	}

	ngOnInit(){
		this.getList();
	}

	clear(){
		this.params = {
			user: 'D88A728E-89CA-E311-A4DE-F01FAFD0F1FD',
			kw: '',
			offset: 1,
			max: 5
		};
	}

	getList(){
		this.http.getData(this.getListApi, this.params)

	    .then((res) => {
	        console.log(res)

	    })
	    .catch(res => {
	    	console.log('error:' + res)
	    	this.message = '获取数据失败';
	    	this.showMsg = true;

	    	setTimeout(() => {this.showMsg = false; }, this.msgTime);
	    });
	}

	toggleModal(e?){
		e && e.stopPropagation();
	    this.showModal = !this.showModal;
	}

	onActivate(e){
       this.toChild = true;
	}
	onDeactivate(e){
	    this.toChild = false;
	}
}
