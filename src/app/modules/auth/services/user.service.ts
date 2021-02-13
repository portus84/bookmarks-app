import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractRestService} from '../../../shared/services/abstract-rest.service';
import {User} from '../models/user';

@Injectable()
export class UserService extends AbstractRestService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  find(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }

  save(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseURL}/users`, user);
  }

  edit(user: User): Observable<any> {
    return this.http.put<User>(`${this.baseURL}/users/${user.id}`, user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/${id}`);
  }
}
