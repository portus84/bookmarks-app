import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractRestService} from '../../../core/services/abstract-rest.service';
import {Bookmark} from '../models/bookmark';

@Injectable()
export class BookmarkGroupService extends AbstractRestService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  find(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.apiURL}/bookmarks`);
  }

  save(bookmark: Bookmark): Observable<any> {
    return this.http.post<Bookmark>(`${this.apiURL}/bookmarks`, bookmark);
  }

  edit(bookmark: Bookmark): Observable<any> {
    return this.http.put<Bookmark>(`${this.apiURL}/bookmarks/${bookmark.id}`, bookmark);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/bookmarks/${id}`);
  }
}
