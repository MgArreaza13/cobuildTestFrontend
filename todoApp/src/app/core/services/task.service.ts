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


  delete(id: number) {
    return this.http.delete(`${ environment.apiRoot }/api/tasks/delete/${id}/`);
  }
  
//   logout() {
//     return this.http.post(`${ environment.apiRoot }/api/accounts/logout/`, {});
//   }

}
