import {Component, OnInit} from '@angular/core';
import {Todo} from './todo.model';
import {TodoDataService} from '../service/data/todo-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {

  todos: Todo[];
  message: string;

  constructor(private todoDataService: TodoDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshTodoList();
  }

  private refreshTodoList(): void {
    this.todoDataService.retrieveAllTodos('b3nkos').subscribe(
      response => this.todos = response,
      error => console.error(error)
    );
  }

  handleUpdateTodo(id: number): void {
    this.router.navigate(['todos', id]);
  }

  handleDeleteTodo(id: number): void {
    this.todoDataService.deleteTodo('b3nkos', id).subscribe(
      () => {
        this.message = `Delete of Todo ${id} Successful`;
        this.refreshTodoList();
      }
    );
  }

}
