import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public URL = environment.url;

  constructor(public http: HttpClient) {}
}

export const InterceptorSkipHeaderStr = 'X-Skip-Interceptor';

export const InterceptorSkipHeader = new HttpHeaders().set(InterceptorSkipHeaderStr, '');
