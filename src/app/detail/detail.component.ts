import { Component } from '@angular/core';
import { transition, style, animate, state, trigger } from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';

import { HttpService } from '../app.service';

import 'rxjs/add/operator/switchMap';

@Component({

  selector: 'detail',  // <home></home>

  templateUrl: './detail.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translateX(-50%)'}))
      ])
    ])
  ]
})
export class DetailComponent {

	constructor(
	    private http: HttpService,
	    private route: ActivatedRoute
	) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
      	console.log(params['id']);
      	return [{}]//;this.http.getData(params['id'])
      })
      .subscribe(hero => {});
  }
  

}
