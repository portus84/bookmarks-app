/**
 * Load Collection Actions
 */
import {createAction, props} from '@ngrx/store';
import {Bookmark} from '../../models/bookmark';

/**
 * Load Collection Action
 */
export const triggerState = createAction('[Collection Page] Enter');

export const loadBookmarksSuccess = createAction(
  '[Collection/API] Load Bookmarks Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const saveBookmark = createAction(
  'Save Bookmark',
  props<Bookmark>()
);

export const deleteBookmark = createAction(
  'Delete Bookmark',
  props<Bookmark>()
);
