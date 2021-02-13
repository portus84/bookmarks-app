import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage: string;

                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        if (error.error) {
                            if (typeof error.error === 'string') {
                                errorMessage = `${error.error}`;
                            } else if (error.error.message) {
                                errorMessage = error.error.message;
                            } else {
                                if (error.error.error === 'string') {
                                    errorMessage = error.error.error;
                                } else {
                                    errorMessage = error.error;
                                }
                            }
                        } else {
                            // server-side error
                            errorMessage = `${error.message}`;
                        }
                    }

                    if (error.status === 0 || error.status === 404 || error.status === 500) {
                        errorMessage = 'There was a problem, please contact system administrator.';
                    }

                    if (
                        error.status === 401 && errorMessage.toLowerCase().trim().endsWith('Expired or invalid JWT token'.toLowerCase())
                    ) {
                        this.router.navigate(['/error']);
                    }

                    return throwError(errorMessage);
                })
            );
    }
}
