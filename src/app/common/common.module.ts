import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 页面回退指令
import {BackDirective} from './back.directive';

// 模态框指令
import {DHBModalDirective} from './modal.directive';

//阻止冒泡指令
import {StopBubbleDirective} from './stop-bubble.directive';

// 分页组件
import {PaginationComponent} from './pagination.component';


@NgModule({
  declarations: [
    // Components / Directives/ Pipes
      BackDirective,
      DHBModalDirective,
      StopBubbleDirective,
      PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      DHBModalDirective,
      BackDirective,
      StopBubbleDirective,
      PaginationComponent
  ]
})
export class ShareModule {
	
}