import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../../shared/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          
          if (error.error instanceof ErrorEvent) {
            this.error(`Client Error: ${error.error.message}`)
          }
          else {
            this.error(`Server Error Code: ${error.status},  Message: ${error.error.message}`);
          }

          return next.handle(request);

        })
      )
  }

  private error(msg: string){
    this.alertService.error( msg );
  }
}
