import { Component, OnDestroy, ElementRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';
// import { transition, style, animate, state, trigger } from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';

import { HttpService } from '../app.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

declare var $: any;

@Component({

  selector: 'detail',  // <home></home>

  templateUrl: './detail.component.html',
  /*animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      //state('out', style({transform: 'translateX(100%)'})),
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms linear')
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)'}),
        animate('300ms linear', style({transform: 'translateX(100%)'}))
        //animate(300, style({transform: 'translateX(-50%)'}))
      ])
    ])
  ]*/
})
export class DetailComponent implements AfterViewInit {

  private getDetailApi = 'account/';
  private getCallApi = 'recordings/search';

  message;
  showMsg = false;
  msgTime = 3000;
  detail = {};
  list;
  currCall = {
    mediaId: '',
    contactName: '',
    dialTime: '',
    phoneNum: '',
    callLength: 0
  };
  public showMore: boolean = false;

  // 主音频标签
  private _audio: HTMLAudioElement;
  // 当前列表中的音频
  private playList: any;
  // 当前播放的数据
  private playData: any;
  private listenInterval: any;

  public volumePercent = 60;

  /**
   * 创建新的音频标签到body下
   */
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private ref: ElementRef,
    private cref: ChangeDetectorRef

  ) {
      this._audio = document.createElement('audio');
      this._audio.style.width = '0';
      this._audio.style.height = '0';
      document.body.appendChild(this._audio);
      this._audio.autoplay = false;
      this._audio.volume = 0.6;
      this._audio.onplay = () => {
          let that = this;
          this.listenInterval = window.setInterval(() => {
              this.playData.Current = this._audio.currentTime;
              this.playData.Url = this._audio.src;
              this.playData.During = this._audio.duration;
              this.playData.Data = this._audio.buffered &&
                  this._audio.buffered.length ?
                  (this._audio.buffered.end(0) || 0) :
                  0;

              this.cref.detectChanges();
          }, 1000);
          this.playData.IsPlaying = true;
      };
      this._audio.onended = () => {
          window.clearInterval(this.listenInterval);
          this.FillPlayData();
          this.playData.IsPlaying = false;
      };
      this._audio.onabort = () => {
          window.clearInterval(this.listenInterval);
          this.playData.Current = this._audio.currentTime;
          this.playData.Url = this._audio.src;
          this.playData.During = this._audio.duration;
          this.playData.Data = this._audio.buffered &&
              this._audio.buffered.length ?
              (this._audio.buffered.end(0) || 0) :
              0;
          this.playData.IsPlaying = false;
      };
      this._audio.onpause = () => {
          window.clearInterval(this.listenInterval);
          this.playData.Current = this._audio.currentTime;
          this.playData.Url = this._audio.src;
          this.playData.During = this._audio.duration;
          this.playData.Data = this._audio.buffered &&
              this._audio.buffered.length ?
              (this._audio.buffered.end(0) || 0) :
              0;
          this.playData.IsPlaying = false;
      };
      this.playData = { Style: 0, Index: 0 };
      this.playList = [];
  }

  ngAfterViewInit(){
    let $ref = $(this.ref.nativeElement),
      w_h = $(window).height(),
      mt = ($(window).width() * 0.04) * 3,
      $block = $ref.find('.detial-block'),
      player_h = $ref.find('.player-wrap')[0].clientHeight,
      h;


    h = w_h - $block.eq(0).outerHeight() - $block.eq(1).outerHeight() - mt - player_h - 80;

    $block.eq(2).height(h);

  }

  ngOnInit(): void {

    let accountId = this.route.snapshot.params['accountId'];

    /*this.route.params
    .switchMap((params: Params) => {
      console.log(params['id']);
      return [{}]//;this.http.getData(params['id'])
    })
    .subscribe(hero => {});*/

    //console.log(this.route.snapshot.params['accountId']);

    this.getDetail(accountId);

    this.getCallList(accountId); /*'70D31F5C-C89D-4C81-8BD1-0384E9D6CE91'*/
  }

  getCallList(id){
    this.http.getData(this.getCallApi, {account: id})

      .then((res) => {
          this.list = res;

          this.addMedia()
      })
      .catch(res => {
        this.message = '获取拨打记录失败';
        this.showMsg = true;
        //this.ref.
        setTimeout(() => {this.showMsg = false; }, this.msgTime);
      });
  }

  choiceVoice(index){
    this.currCall = this.list[index];
    this.Toggle({Url: window['__config']['MEDIA_API'] + 'avaya/play?id=' + this.currCall.mediaId})
  }

  addMedia(){
    if(this.list && this.list.length > 0){
      this.currCall = this.list[0];
      this.list.forEach((item) => {
        this.Add({Url: window['__config']['MEDIA_API'] + 'avaya/play?id=' + item.mediaId});
      });
      
    }
  }

  toggleMore(){
    this.showMore = !this.showMore;
  }

  getDetail(params){
    this.http.getData(this.getDetailApi + params)

      .then((res) => {
          this.detail = res;
      })
      .catch(res => {
        this.message = '获取客户明细失败';
        this.showMsg = true;
        //this.ref.
        setTimeout(() => {this.showMsg = false; this.cref.detectChanges();}, this.msgTime);
      });
  }
  ngOnDestroy(){
    //this.state = 'out';
    this._audio.pause();
    //delete this._audio;
  }

  public volumeCtrl(type: string){
    if(type == 'plus'){
      if(this.volumePercent < 100){
        this.volumePercent = this.volumePercent + 10;
        try{
          this._audio.volume = this.volumePercent / 100 + 0.1;
        }
        catch(e){
          alert('不支持声音控制')
        }
        
        
        this.cref.detectChanges();
      }
      return;
    }
    if(this.volumePercent > 0){
      this._audio.volume = this.volumePercent / 100 - 0.1;
      this.volumePercent -= 10;
      this.cref.detectChanges();
    }

    
  }

  /**
   * 1.列表中无此音频则添加并播放
   * 2.列表中存在此音频但未播放则播放
   * 3.列表中存在此音频且在播放则暂停
   * @param audio
   */
  public Toggle(audio?): void {
      let tryGet = audio ?
          this.playList.findIndex((p: any) => p.Url === audio.Url) :
          this.playData.Index;
      
      if (tryGet < 0) {
          this.playList.push(audio);
          this.PlayIndex(this.playList.length);
      } else {
          if (tryGet === this.playData.Index && this._audio.src) {
              if (this._audio.paused) {
                  this._audio.play();
                  this.playData.IsPlaying = true;
              } else {
                  this._audio.pause();
                  this.playData.IsPlaying = false;
              }
          } else {
              this.PlayIndex(tryGet);
          }
      }
      this.cref.detectChanges();
  }

  /**
   * 若列表中无此音频则添加到列表的最后
   * 若列表中无音频则添加后并播放
   * @param audio
   */
  public Add(audio): void {
      this.playList.push(audio);
      if (this.playList.length === 1) {
          //this.PlayIndex(0);
          //setTimeout(() => {this.Toggle()}, 300);
      }
  }

  /**
   * 移除列表中指定索引的音频
   * 若移除的就是正在播放的音频则自动播放新的同索引音频，不存在此索引则递减
   * 若只剩这一条音频了则停止播放并移除
   * @param index
   */
  public Remove(index: number): void {
      this.playList.splice(index, 1);
      if (!this.playList.length) {
          this._audio.src = '';
      } else {
          this.PlayIndex(index);
      }
  }

  /**
   * 下一曲
   */
  public Next(): void {
      switch (this.playData.Style) {
          case 0:
              if (this.playData.Index < this.playList.length) {
                  this.playData.Index++;
                  this.PlayIndex(this.playData.Index);
              }
              break;
          case 1:
              this.playData.Index = (this.playData.Index + 1) % this.playList.length;
              this.PlayIndex(this.playData.Index);
              break;
          case 2:
              this.playData.Index = (this.playData.Index + 1) % this.playList.length;
              this.PlayIndex(this.playData.Index);
              console.log('暂不考虑随机播放将视为列表循环播放');
              break;
          case 3:
              this._audio.currentTime = 0;
              break;
          default:
              if (this.playData.Index < this.playList.length) {
                  this.playData.Index++;
                  this.PlayIndex(this.playData.Index);
              }
              break;
      }
  }

  /**
   * 上一曲
   */
  public Prev(): void {
      switch (this.playData.Style) {
          case 0:
              if (this.playData.Index > 0) {
                  this.playData.Index--;
                  this.PlayIndex(this.playData.Index);
              }
              break;
          case 1:
              this.playData.Index = (this.playData.Index - 1) < 0 ?
                  (this.playList.length - 1) :
                  (this.playData.Index - 1);
              this.PlayIndex(this.playData.Index);
              break;
          case 2:
              this.playData.Index = (this.playData.Index - 1) < 0 ?
                  (this.playList.length - 1) :
                  (this.playData.Index - 1);
              this.PlayIndex(this.playData.Index);
              console.log('暂不考虑随机播放将视为列表循环播放');
              break;
          case 3:
              this._audio.currentTime = 0;
              break;
          default:
              if (this.playData.Index > 0) {
                  this.playData.Index--;
                  this.PlayIndex(this.playData.Index);
              }
              break;
      }
  }

  /**
   * 将当前音频跳转到指定百分比进度处
   * @param percent
   */
  public Skip(e: any): void {
      let offset = $(window).width() * 0.06;
      let percent = (e.clientX - offset) / e.target.getBoundingClientRect().width;

      if(isNaN(this._audio.duration)) return;

      this._audio.currentTime = this._audio.duration * percent;
      this.playData.Current = this._audio.currentTime;
      this.cref.detectChanges();
  }

  public PlayList() {
      return this.playList;
  }

  public PlayData() {
      return this.playData;
  }

  /**
   * 用于播放最后强行填满进度条
   * 防止播放进度偏差导致的用户体验
   */
  private FillPlayData(): void {
      this.playData.Current = this._audio.duration;
      this.playData.Data = this._audio.duration;
  }

  /**
   * 尝试播放指定索引的音频
   * 索引不存在则尝试递增播放，又失败则递减播放，又失败则失败
   * @param index
   */
  private PlayIndex(index: number): void {
      index = this.playList[index] ? index :
          this.playList[index + 1] ? (index + 1) :
              this.playList[index - 1] ? (index - 1) : -1;
      if (index !== -1) {
          this._audio.src = this.playList[index].Url;
          if (this._audio.paused) {
              this._audio.play();
              this.playData.IsPlaying = true;
          }
          this.playData.Index = index;
          this.currCall = this.list[index];
      } else {
          console.log('nothing to be play');
      }
  }

}
