import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {catchError, tap} from 'rxjs/operators';
import {LoggerService} from '../../core/service/logger.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private injector: Injector, private logger: LoggerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authService = this.injector.get(AuthService);


    let token = authService.getAuthToken();
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
        withCredentials: true,
        url: req.url
      });

      const start = Date.now();

      return next.handle(clonedRequest)
        .pipe(
          tap(data => {
            if (data instanceof HttpRequest) {
              const elapsed = Date.now() - start;
              this.logger.info(`${clonedRequest.url} took ${elapsed} ms`);
            }
          }),
          catchError(err => {
            return throwError(err);
          })
        );
    }
  }
