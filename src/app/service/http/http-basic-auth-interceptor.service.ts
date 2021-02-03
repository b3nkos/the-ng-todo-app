import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicAuthenticationService} from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpBasicAuthInterceptorService implements HttpInterceptor {
  constructor(private basicAuthenticationService: BasicAuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const basicAuthenticationHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    const username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthenticationHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthenticationHeaderString
        }
      });

    }

    return next.handle(request);
  }
}
