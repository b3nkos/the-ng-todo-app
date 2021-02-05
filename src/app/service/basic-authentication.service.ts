import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WelcomeMessage} from './data/welcome-data.service';
import {map} from 'rxjs/operators';
import {API_URL} from '../app.constants';

const TOKEN = 'token';
const AUTHENTICATED_USER = 'authenticatedUser';

class TokenResponse {
  constructor(public token: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  executeJWTAuthenticationService(username: string, password: string): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${API_URL}/authenticate`, {
      username,
      password
    }).pipe(map(tokenResponse => {
      sessionStorage.setItem(AUTHENTICATED_USER, username);
      sessionStorage.setItem(TOKEN, `Bearer ${tokenResponse.token}`);
      return tokenResponse;
    }));
  }

  executeAuthenticationService(username: string, password: string): Observable<BasicAuthentication> {
    const encoding = window.btoa(`${username}:${password}`);
    const basicAuthString = `Basic ${encoding}`;
    const headers = new HttpHeaders({
      Authorization: basicAuthString
    });

    return this.httpClient.get<WelcomeMessage>(`${API_URL}/basic-auth`, {
      headers
    }).pipe(map(data => {
      sessionStorage.setItem(AUTHENTICATED_USER, username);
      sessionStorage.setItem(TOKEN, basicAuthString);
      return data;
    }));
  }

  getAuthenticatedUser(): string | null {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(): string | null {

    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }

    return null;
  }

  isUserLoggedIn(): boolean {
    const username = sessionStorage.getItem(AUTHENTICATED_USER);
    return username !== null;
  }

  logout(): void {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class BasicAuthentication {
  constructor(public message: string) {
  }
}
