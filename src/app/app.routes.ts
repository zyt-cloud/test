import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { DetailComponent } from './detail/detail.component';
import { CollectComponent } from './collect/collect.component';

import { CallingComponent } from './filter/calling.component';
import { CalledComponent } from './filter/called.component';

import { NoContentComponent } from './no-content';


export const ROUTES: Routes = [

  /*{ 
  	path: 'system-set', 
  	loadChildren: './settings/system/system-set.module#SystemSetModule', 
  	data: {
  	  preload: true
  	}
  },*/
  
  {
    path: 'home', 
    component: HomeComponent,
    children: [{
        path: 'detail/:id',
        component: DetailComponent
    }]
  },
  /*{
    path: 'calling', 
    component: CallingComponent,
    children: [{
        path: 'detail/:id',
        component: DetailComponent
    }]
  },
  {
    path: 'called', 
    component: CalledComponent,
    children: [{
        path: 'detail/:id',
        component: DetailComponent
    }]
  },*/
  {path: 'collect', component: CollectComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NoContentComponent, pathMatch: 'full' },
];
