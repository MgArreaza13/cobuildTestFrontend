import { Task } from './../../shared/models/taks';
import { User } from './../../shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  get_list() {
    return this.http.get(`${ environment.apiRoot }/api/tasks/list/`);
  }


  create(task: Task) {
    return this.http.post(`${ environment.apiRoot }/api/tasks/new/`, task);
  }


  update(id: number, task: Task) {
    return this.http.put(`${ environment.apiRoot }/api/tasks/edit/${id}/`, task);
  }

  delete(id: number) {
    return this.http.delete(`${ environment.apiRoot }/api/tasks/delete/${id}/`);
  }
  


}
