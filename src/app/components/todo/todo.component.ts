import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: any;
  todo = {
    completed: false,
    title: ''
  };
  addSuccess = false;
  addError = false;

  constructor(
    public todoService: TodoDataService
  ) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;

    }, error => {
      console.log(error);
    });
  }

  addTodo(form) {
    this.todoService.addTodo(this.todo).subscribe( todo => {
      this.todos.unshift(todo);
      form.resetForm();
      this.addSuccess = true;
      setTimeout(() => {
        this.addSuccess = false;
      }, 2000);
    }, error => {
      console.error(error);
      this.addError = true;
      setTimeout(() => {
        this.addError = false;
      }, 2000);
    });
  }

  editTodo(todo) {
    this.todoService.editTodo(todo).subscribe( todo => {
      console.log(todo);
    }, error => {
      console.log(error);
    });
  }

}
