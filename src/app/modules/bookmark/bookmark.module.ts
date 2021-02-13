import {NgModule} from '@angular/core';
import {BookmarksListComponent} from './components/bookmarks-list/bookmarks-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {BookmarkDialogComponent} from './components/bookmark-dialog/bookmark-dialog.component';
import {EffectsModule} from '@ngrx/effects';
import {BookmarkEffects} from './store/effects/bookmark.effects';
import {BookmarkService} from './services/bookmark.service';
import {StoreModule} from '@ngrx/store';
import {bookmarkFeatureKey, reducer} from './store/reducer/bookmark.reducer';


@NgModule({
  declarations: [
    BookmarksListComponent,
    BookmarkDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookmarksListComponent
      }
    ]),
    StoreModule.forFeature(bookmarkFeatureKey, {bookmarks: reducer}),
    EffectsModule.forFeature([BookmarkEffects])
  ],
  providers: [
    BookmarkService
  ]
})
export class BookmarkModule {
}
