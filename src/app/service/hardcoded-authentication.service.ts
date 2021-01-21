import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() {
  }

  authenticate(username: string, password: string): boolean {
    if (username === 'b3nkos' && password === 'dummy') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }

    return false;
  }

  isUserLoggedIn(): boolean {
    const username = sessionStorage.getItem('authenticatedUser');
    return username !== null;
  }

  logout(): void {
    sessionStorage.removeItem('authenticatedUser');
  }
}
