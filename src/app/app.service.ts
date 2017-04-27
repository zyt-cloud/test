import { Injectable } from '@angular/core';

import { Headers, Http, URLSearchParams, BrowserXhr } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import {PreloadingStrategy, ActivatedRoute, Router, Route} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

declare var $: any;

export type InternalStateType = {
  [key: string]: any
};

// 配置信息
export class Config {
  //static ENV = 'prod';
  static DEV_API: string = window['__config']['DEV_API'];
  static PROD_API: string = window['__config']['PROD_API'];
}

// 工具类
export class Utils {
  static sysConfig: any;
  static sendMessage(msg){
    console.log(msg)
    window.parent.postMessage(msg,'*');
  }

  static message(text, type){
    type = type === 'info' ? 'msg_info' : 'msg_error';
    this.sendMessage(JSON.stringify({
      type: type,
      content: text
    }));
  }

  static info(text){
    this.message(text, 'info');
  }

  static error(text){
    this.message(text, 'error');
  }

}


@Injectable()
export class AppState {

  public _state: InternalStateType = { };

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

  
}
/*@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor() {super()}
  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}*/

@Injectable()
export class HttpService {

  //private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  //Content-Type:application/x-www-form-urlencoded
  //, 'Cookies': 'gr_user_id=344cc632-390c-4d56-9f12-78be78173543; gr_session_id_b9c76468acc54288bfd0292976a2514d=4b12b070-ce1f-47c2-b399-180addf9de55; session_id=h1e0jjqrcr0q0g396k5vlmro26; accounts_name=whm123; autologin=false'
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});

  constructor(private http: Http){
    /*c.put('session_id', 'uia8vnuv8p7vru9rsfvv948b32')*/
  }

  // 获取数据
  public getData(url: string, inData?: any){

    let params: URLSearchParams = new URLSearchParams();

    url = 'production' !== ENV ? Config.DEV_API + url : Config.PROD_API + url;

    if(inData){
      /*for(let [key, value] of Object.entries(inData)){
        params.set(key, value);
      }*/
      for(let key of Object.keys(inData)){
        params.set(key, inData[key]);
      }
    }

    params.set('user', window.sessionStorage.getItem('user'));

    // 测试代理
    if(window.location.protocol === 'https:'){
      url = 'https://bird.ioliu.cn/v1/?url=' + url;
    }

    $('#loading').removeClass('hide');

    return this.http
      .get(url ,{search: params,/*withCredentials: true*/headers: this.headers})
      .toPromise()
      .then(response => {
        $('#loading').addClass('hide');
        return response.json()
      })
      .catch(this.handleError);
  }

  // 提交数据
  public saveData(url: string, inData?: any){
    
    let params: URLSearchParams = new URLSearchParams();

    url = 'production' !== ENV ? Config.DEV_API + url : Config.PROD_API + url;

    if(inData){
      for(let key of Object.keys(inData)){
        params.set(key, inData[key]);
      }
    }
    
    params.set('user', window.sessionStorage.getItem('user'));

    // 测试代理
    if(window.location.protocol === 'https:'){
      url = 'https://bird.ioliu.cn/v1/?url=' + url;
    }

    $('#loading').removeClass('hide');

    return this.http
      .post(url, params, {headers: this.headers/*,withCredentials: true*/})
      .toPromise()
      .then(res => {
        $('#loading').addClass('hide');
        return res.json()
      })
      .catch(this.handleError);
  }

  // 提交数据
  public putData(url: string, inData?: any){
    
    let params: URLSearchParams = new URLSearchParams();

    url = 'production' !== ENV ? Config.DEV_API + url : Config.PROD_API + url;

    if(inData){
      for(let key of Object.keys(inData)){
        params.set(key, inData[key]);
      }
    }
    
    params.set('user', window.sessionStorage.getItem('user'));

    // 测试代理
    if(window.location.protocol === 'https:'){
      url = 'https://bird.ioliu.cn/v1/?url=' + url;
    }

    $('#loading').removeClass('hide');

    return this.http
      .put(url, params, {headers: this.headers,withCredentials: true})
      .toPromise()
      .then(res => {
        $('#loading').addClass('hide');
        return res.json()
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    //console.error('错误原因', error); // 仅用于调试
    $('#loading').addClass('hide');
    return Promise.reject(error.message || error);
  }
}

// 刷新选项卡服务
@Injectable()
export class RefreshTabService {

  private refreshTabSource = new Subject<string>();

  refreshTab = this.refreshTabSource.asObservable();

  setTabData(data: string){
    this.refreshTabSource.next(data)
  }
}

// 预加载模块
@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

  constructor(private route : ActivatedRoute, private router : Router) {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {

    // ng 需要预加载返回load() 不需要的话就返回 Observable.of(null);
    if (route.data && route.data['preload']) {
      return load();
    }
　              
    return Observable.of(null);        
  }    
}
