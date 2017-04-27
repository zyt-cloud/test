import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import { transition, style, animate, state, trigger } from '@angular/animations';

import {HttpService} from '../app.service';

@Component({

  selector: 'home',  // <home></home>

  templateUrl: './home.component.html'
})
export class HomeComponent {

	//private getListApi = 'avaya/play'; //recordings/search';
	private getListApi = 'recordings/search';

	toChild = false;
	showModal = false;
	message;
	showMsg = false;
	msgTime = 3000;
	isSubmit = false;
	list;
	showSearch = false;
	searchText = '';

	isMore = false;
	index = -1;
	isGetting: boolean = false;

	params = {
		//user: 'D88A728E-89CA-E311-A4DE-F01FAFD0F1FD',
		key: '',
		offset: 0,
		max: 5
	};
	today: string;

	constructor(private http: HttpService, private ref: ChangeDetectorRef,){
	    
	}

	ngOnInit(){
		this.getList();
		let date = new Date();
		let m = date.getMonth() + 1;
		let d = date.getDate();
		this.today = (date.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d));
	}

	clear(){
		this.params = {
			//user: 'D88A728E-89CA-E311-A4DE-F01FAFD0F1FD',
			key: '',
			offset: 0,
			max: 5
		};
		this.list = null;
	}

	// 获取列表
	getList(){
		if(this.isGetting){
			return;
		}
		this.isGetting = true;
		this.http.getData(this.getListApi, this.params)

	    .then((res) => {
	    	if(res && res.length > 0){
	    		this.isMore = true;
	    		this.list = this.list ? this.list.concat(res) : res;
	    	}
	        else{
	        	this.isMore = false;
	        }
	        this.isGetting = false;
	    })
	    .catch(res => {
	    	this.isGetting = false;
	    	this.message = '获取数据失败';
	    	this.showMsg = true;
	    	//this.ref.
	    	setTimeout(() => {this.showMsg = false; }, this.msgTime);
	    });
	}

	loadMore(){
		if(this.isMore){
			this.params.offset += this.params.max;
			this.getList();
		}
		
	}

	// 评论框
	toggleModal(e?, index?){
		e && e.stopPropagation();

		if(!isNaN(index)){
			this.index = index;
		}

	    this.showModal = !this.showModal;
	}
	addComment(text){
		if(!text){
			this.message = '请输入内容';
	    	this.showMsg = true;
	    	//this.ref.
	    	setTimeout(() => {this.showMsg = false; }, this.msgTime);
			return;
		}
		
		let url = `recording/${this.list[this.index].id}/comments`;
		let params = {
			text: text,
			userId: this.list[this.index].userId,
			userName: this.list[this.index].userName,
			enabled: true
		};
		this.http.saveData(url, params)

	    .then((res) => {
	    	this.showModal = false;
	    })
	    .catch(res => {

	    	this.message = '操作失败';
	    	this.showMsg = true;
	    	//this.ref.
	    	setTimeout(() => {this.showMsg = false; }, this.msgTime);
	    });
	}

	favToggle(e, index){
		e.stopPropagation();

		this.index = index;

		let url = `recording/${this.list[this.index].id}/favorites`;
		let method = 'saveData';
		if(this.list[this.index].favorites.length > 0){
			url = `favorite/${this.list[this.index].id}`;
			method = 'putData';
		}

		let params = {
			userId: this.list[this.index].userId,
			userName: this.list[this.index].userName,
			enabled: !(this.list[this.index].favorites.length > 0)
		};

		this.http.saveData(url, params)

	    .then((res) => {
	    	

	    })
	    .catch(res => {

	    	this.message = '操作失败';
	    	this.showMsg = true;
	    	//this.ref.
	    	setTimeout(() => {this.showMsg = false; }, this.msgTime);
	    });
	}

	search(){
		this.showSearch = false;
		this.clear();
		this.params.key = this.searchText;
		this.getList();

	}

	// 搜索
	toggleSearch(){
		this.showSearch = !this.showSearch;
	}

	onActivate(e){
       this.toChild = true;
	}
	onDeactivate(e){
	    this.toChild = false;
	}
}
