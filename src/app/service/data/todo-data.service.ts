import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../../list-todo/todo.model';
import {API_URL} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private httpClient: HttpClient) {
  }

  retrieveAllTodos(username: string): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${API_URL}/users/${username}/todos`);
  }

  retrieveTodo(username: string, id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${API_URL}/users/${username}/todos/${id}`);
  }

  deleteTodo(username: string, id: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username: string, todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${API_URL}/users/${username}/todos/${todo.id}`, todo);
  }

  creteTodo(username: string, todo: Todo): Observable<void> {
    return this.httpClient.post<void>(`${API_URL}/users/${username}/todos`, todo);
  }
}
