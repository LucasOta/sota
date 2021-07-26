import { Injectable } from '@angular/core';
import { ApiService, InterceptorSkipHeader } from '../api.service';

import { Industry } from "../../../shared/models/industry";

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(private api: ApiService) { }

  get(avoidLangIntercep = false, id?: string) {
    var headers;
    avoidLangIntercep ? headers = InterceptorSkipHeader : headers = {};
    if (id) {
      return this.api.http.get<any>(`${this.api.URL}/industry/${id}`, {headers});
    }
    return this.api.http.get<any>(`${this.api.URL}/industry`, {headers});
  }
  
  create(industry: Industry) {
    return this.api.http.post<any>(`${this.api.URL}/industry/create`, industry);
  }
  
  update(industry: Industry) {
    return this.api.http.patch<any>(`${this.api.URL}/industry/update`, industry);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.api.URL}/industry/${id}`, {});
  }
}
