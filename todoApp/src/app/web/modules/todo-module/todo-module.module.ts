import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
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
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    
  ]
})
export class TodoModuleModule { }
