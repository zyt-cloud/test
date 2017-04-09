import { Component } from '@angular/core';
import { transition, style, animate, state, trigger } from '@angular/animations';

@Component({

  selector: 'calling',  // <home></home>

  templateUrl: './calling.component.html',
  animations: [

  ]
})
export class CallingComponent {

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
