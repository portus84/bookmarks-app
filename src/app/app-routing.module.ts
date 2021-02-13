import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './modules/auth/guards/auth.guard';
import {LoginPageComponent} from './modules/auth/components/login/login-page.component';
import {AuthModule} from './modules/auth/auth.module';

export const APP_ROUTES: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'bookmark'
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'bookmark',
    loadChildren: () => import('./modules/bookmark/bookmark.module').then(m => m.BookmarkModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
