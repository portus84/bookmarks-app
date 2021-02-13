import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {mergeMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AbstractRestService} from '../../../core/services/abstract-rest.service';
import {HttpHeaders} from '../models/http-headers';

@Injectable()
export class AuthService extends AbstractRestService {

  private static USER_TOKEN = 'token';
  private static LOGGED_USER_KEY = 'user';

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem(AuthService.LOGGED_USER_KEY));
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.USER_TOKEN);
  }

  login(username?: string): Observable<User> {
    this.logout();
    let token;

    return this.http.post<any>(`${this.apiURL}/signin`,
      {
        username
      })
      .pipe(
        mergeMap(data => {
          token = data.token || data.access_token;
          return this.me(token);
        }),
        tap(() => {
          localStorage.setItem(AuthService.USER_TOKEN, token);
        })
      );
  }

  me(token?: string): Observable<User> {
    token = token || this.getToken();

    let obs: Observable<User>;

    if (token) {
      const headers = {};
      headers[HttpHeaders.AUTHORIZATION] = `Bearer ${token}`;

      obs = this.http.get<User>(`${this.apiURL}/me`, {
        headers
      });
    } else {
      obs = this.login();
    }

    return obs.pipe(
      tap((user) => {
          localStorage.setItem(AuthService.LOGGED_USER_KEY, JSON.stringify(user));
        }
      )
    );
  }

  logout(): Observable<boolean> {
    localStorage.clear();
    return of(true);
  }

}
