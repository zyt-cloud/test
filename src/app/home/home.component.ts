import { Component } from '@angular/core';
import { transition, style, animate, state, trigger } from '@angular/animations';

@Component({

  selector: 'home',  // <home></home>

  templateUrl: './home.component.html',
  animations: [

  ]
})
export class HomeComponent {

	toChild = false;
	showModal = false;
	isSubmit = false;

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
