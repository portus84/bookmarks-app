import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromBookmark from '../reducer/bookmark.reducer';

export const selectBookmarkState = createFeatureSelector<fromBookmark.BookmarkState>(
  fromBookmark.bookmarkFeatureKey
);

export const selectBookmarksState = createSelector(
  selectBookmarkState,
  (state: any) => {
    return state.bookmarks.bookmarks.reduce((r, a) => {
      r[a.group] = [...r[a.group] || [], a];
      return r;
    }, {});
  }
);
