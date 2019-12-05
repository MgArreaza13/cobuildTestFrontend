import { Task } from './../../../../shared/models/taks';
import { TaskService } from './../../../../core/services/task.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public taskForm: FormGroup;
  public task: Task = {};
  public idToTaskUpdate: number;
  public submitted = false;
  public isUpdateTask: boolean = false;
  public isFormActive: boolean = false;
  tasks;
  modalRef: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    // Build form
    this.taskForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
      ]],
    });
    this.get_list_task();
  }


  get f() { return this.taskForm.controls; }


  /**
   * create task from user
   */
  onSubmit() {
    this.ngxService.start();
    this.submitted = true;
    if (this.taskForm.invalid) {
      this.ngxService.stop();
      return;
    }

    // Set object
    this.task.title = this.taskForm.get('title').value;
    this.task.description = this.taskForm.get('description').value;

    // Send request
    this.taskService.create(this.task).subscribe(
      (data: any) => {
        this.taskForm.setValue({
          title: '',
          description: ''
        })
        this.isFormActive = false;
        this.get_list_task();
        this.ngxService.stop();
      },
      err => { console.log(err); this.toastr.error('Error', err); this.ngxService.stop(); }
    );
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



  /**
   * deletetask from user
   */
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

  /**
   * setting form update
   */
  updateForm(task: Task) {
    this.isFormActive = true;
    this.isUpdateTask = true;
    this.idToTaskUpdate = task.id;
    this.taskForm.setValue({
      title: task.title,
      description: task.description
    })
  }

  /**
   * edit task from user
  */
  edit() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      this.ngxService.stop();
      return;
    }

    // Set object
    this.task.title = this.taskForm.get('title').value;
    this.task.description = this.taskForm.get('description').value;

    // Send request
    this.taskService.update(this.idToTaskUpdate, this.task).subscribe(
      (data: any) => {
        this.taskForm.setValue({
          title: '',
          description: ''
        })
        this.isFormActive = false;
        this.get_list_task();
        this.ngxService.stop();
      },
      err => { console.log(err); this.toastr.error('Error', err); this.ngxService.stop(); }
    );
  }



  /**
   * show form
   */
  showForm() {
    // set value the form in ''
    this.taskForm.setValue({
      title: '',
      description: ''
    })
    // show create form
    this.isFormActive = true;

    // reset edit form
    this.idToTaskUpdate = 0;
    this.isUpdateTask = false;
  }

  /**
   * hide form
   */
  hideForm() {
    // reset data
    this.idToTaskUpdate = 0;
    this.isFormActive = false;
    this.isUpdateTask = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}



