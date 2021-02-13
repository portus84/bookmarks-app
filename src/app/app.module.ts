import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './modules/auth/services/token.interceptor';
import {HttpErrorInterceptor} from './core/services/http-error-interceptor.service';
import {AppRoutingModule} from './app-routing.module';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      product: () => {
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ...[
      EffectsModule.forRoot()
    ],
    ...[
      AppRoutingModule
    ]
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
