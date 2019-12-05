import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { IndexComponent } from './index/index.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'todo',
  pathMatch: 'full'
}, {
  path: 'todo',
  
  component: IndexComponent,
  loadChildren: '../../modules/todo-module/todo-module.module#TodoModuleModule'
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
