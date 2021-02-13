import {NgModule} from '@angular/core';
import {LoginPageComponent} from './components/login/login-page.component';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginPageComponent
  ],
  exports: [
    LoginPageComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {
}
