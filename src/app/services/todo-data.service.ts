import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retry';

@Injectable()
export class TodoDataService {

  constructor(
    public http: HttpClient
  ) { }

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos').retry(3);
  }

  addTodo(todo) {
    return this.http.post('https://jsonplaceholder.typicode.com/todos', todo );
  }

  editTodo(todo) {
    return this.http.put('https://jsonplaceholder.typicode.com/todos/1', todo);
  }
}
