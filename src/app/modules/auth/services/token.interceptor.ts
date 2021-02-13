import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {HttpHeaders} from '../models/http-headers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (token) {
      const headers = {};
      headers[HttpHeaders.AUTHORIZATION] = `Bearer ${token}`;

      request = request.clone({
        setHeaders: headers
      });
    }

    return next.handle(request);
  }
}
