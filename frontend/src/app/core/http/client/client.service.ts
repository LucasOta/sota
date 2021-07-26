import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

import { Client } from "../../../shared/models/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private api: ApiService) { }

  get(id?: string) {
    if (id) {
      return this.api.http.get<any>(`${this.api.URL}/client/${id}`, {});
    }
    return this.api.http.get<any>(`${this.api.URL}/client`, {});
  }
  
  create(client: Client) {
    return this.api.http.post<any>(`${this.api.URL}/client/create`, client);
  }
  
  update(client: Client) {
    return this.api.http.patch<any>(`${this.api.URL}/client/update`, client);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.api.URL}/client/${id}`, {});
  }
}
