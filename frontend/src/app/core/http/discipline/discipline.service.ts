import { Injectable } from '@angular/core';
import { ApiService, InterceptorSkipHeader } from '../api.service';

import { Discipline } from "../../../shared/models/discipline";

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private api: ApiService) { }

  get(avoidLangIntercep = false, id?: string) {
    var headers;
    avoidLangIntercep ? headers = InterceptorSkipHeader : headers = {};
    if (id) {
      return this.api.http.get<any>(`${this.api.URL}/discipline/${id}`, {headers});
    }
    return this.api.http.get<any>(`${this.api.URL}/discipline`, {headers});
  }
  
  create(discipline: Discipline) {
    return this.api.http.post<any>(`${this.api.URL}/discipline/create`, discipline);
  }
  
  update(discipline: Discipline) {
    return this.api.http.patch<any>(`${this.api.URL}/discipline/update`, discipline);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.api.URL}/discipline/${id}`, {});
  }
  
}
