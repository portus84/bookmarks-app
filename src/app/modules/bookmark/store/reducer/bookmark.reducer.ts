import {Action, createReducer, on} from '@ngrx/store';
import {Bookmark} from '../../models/bookmark';
import * as BookmarksActions from '../actions/bookmark.actions';


export const bookmarkFeatureKey = 'bookmark';

export interface BookmarkState {
  bookmarks: Bookmark[];
}

export const initialState: BookmarkState = {
  bookmarks: []
};

export const bookmarkReducer = createReducer(
  initialState,
  on(BookmarksActions.triggerState, (state: BookmarkState) => ({...state})
  ),
  on(BookmarksActions.loadBookmarksSuccess, (state: BookmarkState, {bookmarks}) => {
    const newState = {...state};
    newState.bookmarks = bookmarks;
    return newState;
  })
);

export function reducer(state: BookmarkState | undefined, action: Action): any {
  return bookmarkReducer(state, action);
}
