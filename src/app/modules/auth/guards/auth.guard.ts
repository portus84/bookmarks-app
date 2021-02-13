import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.me()
      .pipe(
        map(() => {
          return true;
        }),
        catchError(() => {
          this.router.navigate(['/login']).then(() => {
          });
          return of(false);
        })
      );
  }
}
