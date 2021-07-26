import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { FileService } from '../file/file.service';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService, private fileService: FileService) { }

  get(id?: string) {
    if (id) {
      return this.api.http.get<any>(`${this.api.URL}/user/${id}`, {});
    }
    return this.api.http.get<any>(`${this.api.URL}/user`, {});
  }
  
  create(user: User) {
    return this.api.http.post<any>(`${this.api.URL}/user/create`, user);
  }
  
  update(user: User) {
    return this.api.http.patch<any>(`${this.api.URL}/user/update`, user);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.api.URL}/user/${id}`, {});
  }

  uploadFile(img: File ){
    return this.fileService.uploadFile(img);
  }

  login(email, password) {
    return this.api.http.post<any>(`${this.api.URL}/user/login`, { email, password });
  }
}
