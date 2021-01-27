import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private httpClient: HttpClient) {
  }

  executeHelloWorldService(): Observable<WelcomeMessage> {
    return this.httpClient.get<WelcomeMessage>('http://localhost:8080/hello-world');
  }

  executeHelloWorldWithPathVariable(name: string): Observable<WelcomeMessage> {
    return this.httpClient.get<WelcomeMessage>(`http://localhost:8080/hello-world/path-variable/${name}`);
  }
}

export class WelcomeMessage {
  constructor(public message: string) {
  }
}
