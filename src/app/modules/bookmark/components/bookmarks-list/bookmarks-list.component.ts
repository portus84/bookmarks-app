import {Component, OnInit} from '@angular/core';
import {Bookmark} from '../../models/bookmark';
import {MatDialog} from '@angular/material/dialog';
import {BookmarkDialogComponent} from '../bookmark-dialog/bookmark-dialog.component';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as BookmarksActions from '../../store/actions/bookmark.actions';
import {selectBookmarksState} from '../../store/selector/bookmark.selector';
import {BookmarkState} from '../../store/reducer/bookmark.reducer';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/models/user';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit {

  Object = Object;
  bookmarks$: Observable<{ [group: string]: Bookmark[] }>;

  constructor(
    private store: Store<BookmarkState>,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {
    this.bookmarks$ = store.select(selectBookmarksState);
  }

  ngOnInit(): void {
    this.store.dispatch(BookmarksActions.triggerState());
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      window.location.href = '/';
    });
  }

  get loggedUser(): User {
    return this.authService.getLoggedUser();
  }

  delete(bookmark: Bookmark): void {
    this.store.dispatch(BookmarksActions.deleteBookmark(bookmark));
  }

  edit(bookmark: Bookmark): void {
    this.openBookmarkDialog(bookmark);
  }

  add(): void {
    this.openBookmarkDialog();
  }

  private openBookmarkDialog(bookmark?: Bookmark): void {
    this.dialog.open(BookmarkDialogComponent, {
      data: bookmark,
      disableClose: true,
      autoFocus: true
    });
  }
}
