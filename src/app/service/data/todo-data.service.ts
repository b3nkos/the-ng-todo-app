import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../../list-todo/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private httpClient: HttpClient) {
  }

  retrieveAllTodos(username: string): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`http://localhost:8080/users/${username}/todos`);
  }

  retrieveTodo(username: string, id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`http://localhost:8080/users/${username}/todos/${id}`);
  }

  deleteTodo(username: string, id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/users/${username}/todos/${id}`);
  }
}
