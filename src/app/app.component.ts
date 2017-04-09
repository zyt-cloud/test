/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { HttpService, RefreshTabService, Utils } from './app.service';

import {Router} from '@angular/router';

import 'rxjs/add/operator/map';


// require('../assets/laydate.js');
require('../assets/jquery.min.js');


//"@types/selenium-webdriver": "~2.53.39",
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  /*styles: [`
    
  `],*/
  providers: [RefreshTabService],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private getConfigUrl: string = 'Manager/SystemSetting/updateSystemSetting';

  constructor(
    private router: Router,
    public http: HttpService,
    public refreshTabService: RefreshTabService
  ) {}

  public ngOnInit() {
    //this.getConfig();
  }

  getConfig(){
    this.http.getData(this.getConfigUrl)

    .then((res) => {

      if(res.status === 'success'){
         Utils.sysConfig = res.data;
      }

    })
    .catch(res => {

    });
  }
  
  // 刷新选项卡
  refreshTab(){
    this.refreshTabService.setTabData(this.router.url);
  }

}
