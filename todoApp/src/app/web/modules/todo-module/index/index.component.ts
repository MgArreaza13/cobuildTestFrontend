import { TaskService } from './../../../../core/services/task.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tasks;
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.get_list_task();
  }

  /**
   * get list tasks from user
   */
  get_list_task() {
    this.ngxService.start()
    this.taskService.get_list().subscribe(
      (data) => {
        this.tasks = data;
        this.ngxService.stop();
        this.toastr.success('Tareas cargadas con exito');
      },
      error => { console.log(error); this.toastr.success(error); this.ngxService.stop(); }
    );
  }

  delete(id: number) {
    this.ngxService.start()
    this.taskService.delete(id).subscribe(
      (data) => {
        this.get_list_task(); // update tasks
        this.ngxService.stop();
        this.toastr.success('Tarea eliminada con exito');
      },
      error => { console.log(error); this.toastr.success(error); this.ngxService.stop(); }
    );
  }
}
  


