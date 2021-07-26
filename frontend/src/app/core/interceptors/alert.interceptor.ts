import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from "../../shared/services/alert.service";

@Injectable()
export class AlertInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            switch(event.status) {
              case 200:
                if (event.body.desc){
                  event.body.ok ? this.success(event.body.desc) : this.error(event.body.desc);
                }
                break;
              case 201:
                this.success( event.body.desc || 'Element Created' );
                break;
              case 203:
                break;
              default:
                this.error('Unespected response');
            }
          }
          return event;
      }));
  }

  private success(msg: string){
    this.alertService.success( msg );
  }
  private warning(msg: string){
    this.alertService.warning( msg );
  }
  private error(msg: string){
    this.alertService.error( msg );
  }
}
