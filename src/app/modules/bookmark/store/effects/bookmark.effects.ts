import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {BookmarkService} from '../../services/bookmark.service';
import * as BookmarksActions from '../../store/actions/bookmark.actions';
import {Bookmark} from '../../models/bookmark';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class BookmarkEffects {

  loadBookmarks$ = createEffect(() => this.actions$.pipe(
    ofType(BookmarksActions.triggerState),
    switchMap(() =>
      this.bookmarkService.find().pipe(
        map((bookmarks: Bookmark[]) =>
          BookmarksActions.loadBookmarksSuccess({bookmarks}))
      ))
    )
  );

  saveBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(BookmarksActions.saveBookmark),
    switchMap((bookmark: Bookmark) =>
      ((bookmark.id) ? this.bookmarkService.edit(bookmark) : this.bookmarkService.save(bookmark)).pipe(
        map(() => {
            this.snackBar.open(`"${bookmark.name}" Bookmark saved`, null, {
              duration: 2000,
              horizontalPosition: 'start',
              verticalPosition: 'bottom'
            });

            return BookmarksActions.triggerState();
          }
        )))
    )
  );

  deleteBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(BookmarksActions.deleteBookmark),
    switchMap((bookmark: Bookmark) =>
      this.bookmarkService.delete(bookmark.id).pipe(
        map(() => {
            this.snackBar.open(`"${bookmark.name}" Bookmark deleted`, null, {
              duration: 2000,
              horizontalPosition: 'start',
              verticalPosition: 'bottom'
            });

            return BookmarksActions.triggerState();
          }
        )))
    )
  );

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService,
    private snackBar: MatSnackBar
  ) {
  }
}
