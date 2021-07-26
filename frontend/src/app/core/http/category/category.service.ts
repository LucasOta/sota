import { Injectable } from '@angular/core';
import { ApiService, InterceptorSkipHeader } from "../api.service";
import { FileService } from "../file/file.service";
import { Category } from 'src/app/shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService, private fileService: FileService) { }

  get(avoidLangIntercep = false, id?: string) {
    var headers;
    avoidLangIntercep ? headers = InterceptorSkipHeader : headers = {};
    if (id) {
      return this.api.http.get<any>(`${this.api.URL}/category/${id}`, {headers});
    }
    return this.api.http.get<any>(`${this.api.URL}/category`, {headers});
  }
  
  create(category: Category) {
    return this.api.http.post<any>(`${this.api.URL}/category/create`, category);
  }
  
  update(category: Category) {
    return this.api.http.patch<any>(`${this.api.URL}/category/update`, category);
  }

  delete(id?: string){
    return this.api.http.delete<any>(`${this.api.URL}/category/${id}`, {});
  }

  uploadFile(img: File ){
    return this.fileService.uploadFile(img);
  }
  
}
