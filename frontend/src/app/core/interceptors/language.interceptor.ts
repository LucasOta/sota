import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from "../../shared/services/language.service";
import { InterceptorSkipHeaderStr } from "../http/api.service";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor(private languageService: LanguageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const lang = this.languageService.getLanguage().value;
    
    if (request.headers.has(InterceptorSkipHeaderStr)) {
      const headers = request.headers.delete(InterceptorSkipHeaderStr);
      request = request.clone({ headers });
      request = request.clone({
        setHeaders:{ 'accept-language': '' }
      });
      return next.handle(request);
    }
    
    request = request.clone({
      setHeaders:{ 'accept-language': lang }
    });

    return next.handle(request);
  }
}
