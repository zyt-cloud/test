import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 页面回退指令
import {BackDirective} from './back.directive';

// 模态框指令
import {DHBModalDirective} from './modal.directive';

//阻止冒泡指令
import {StopBubbleDirective} from './stop-bubble.directive';

// 分页组件
import {PaginationComponent} from './pagination.component';

import {TimePipe} from './time.pipe';
import {DateTimePipe} from './datetime.pipe';


@NgModule({
  declarations: [
    // Components / Directives/ Pipes
      BackDirective,
      DHBModalDirective,
      StopBubbleDirective,
      TimePipe,
      DateTimePipe,
      PaginationComponent
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
      PaginationComponent
  ]
})
export class ShareModule {
	
}
