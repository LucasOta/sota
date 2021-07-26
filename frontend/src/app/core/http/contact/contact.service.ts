import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

import { Contact } from "../../../shared/models/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  PATH = 'contact'; 
  constructor(private api: ApiService) {
    this.PATH = `${api.URL}/${this.PATH}`;
  }

  get(id?: string) {
    if (id) return this.api.http.get<any>(`${this.PATH}/${id}`);
    return this.api.http.get<any>(this.PATH);
  }
  
  create(contact: Contact) {
    return this.api.http.post<any>(`${this.PATH}/create`, contact);
  }
  
  update(contact: Contact) {
    return this.api.http.patch<any>(`${this.PATH}/update`, contact);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.PATH}/${id}`, {});
  }
}
