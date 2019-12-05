import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';

// COMPONENTS
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule,
    ModalModule.forRoot()
  ]
})
export class TodoModuleModule { }
