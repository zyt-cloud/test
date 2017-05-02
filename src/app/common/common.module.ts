import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 页面回退指令
import {BackDirective} from './back.directive';

// 模态框指令
import {DHBModalDirective} from './modal.directive';

//阻止冒泡指令
import {StopBubbleDirective} from './stop-bubble.directive';

import {TimePipe} from './time.pipe';
import {DateTimePipe} from './datetime.pipe';

import {ScrollDirective} from './scroll.directive';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
      BackDirective,
      DHBModalDirective,
      StopBubbleDirective,
      TimePipe,
      DateTimePipe,
      ScrollDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
      CommonModule,
      FormsModule,
      DHBModalDirective,
      BackDirective,
      StopBubbleDirective,
      TimePipe,
      DateTimePipe,
      ScrollDirective
  ]
})
export class ShareModule {
	
}
