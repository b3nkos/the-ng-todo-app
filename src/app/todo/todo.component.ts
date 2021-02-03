import {Component, OnInit} from '@angular/core';
import {TodoDataService} from '../service/data/todo-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../list-todo/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;
  isNewTodo = true;

  constructor(private todoDataService: TodoDataService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.todo = new Todo(Date.now(), '', false, new Date());

    if (Number.isInteger(+this.route.snapshot.params.id)) {
      this.isNewTodo = false;
      this.todoDataService.retrieveTodo('b3nkos', this.id)
        .subscribe(todo => this.todo = todo);
    }
  }

  handleSaveTodo(): void {
    if (this.isNewTodo) {
      this.todoDataService.creteTodo('b3nkos', this.todo)
        .subscribe(() => {
          this.router.navigate(['todos']);
        });
      return;
    }

    this.todoDataService.updateTodo('b3nkos', this.todo)
      .subscribe(() => {
        this.router.navigate(['todos']);
      });
  }
}
