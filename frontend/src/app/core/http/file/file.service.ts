import { Injectable } from '@angular/core';
import { Image } from 'src/app/shared/models/image';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private api: ApiService) { }

  get(moduleName: string, elementId: string, fileName: string) {    
    return this.api.http.get<any>(`${this.api.URL}/file/image/${moduleName}/${elementId}/${fileName}`, {});
  }

  uploadFile(img: File, prefix?: string ){
    const fd = new FormData();
    fd.append('image', img, img.name);
    if (prefix) fd.append('prefix', prefix);
    return this.api.http.post<any>(`${this.api.URL}/file/upload`, fd);
  }

  deleteTemp(imgName: string ){
    return this.api.http.delete<any>(`${this.api.URL}/file/deleteTemp/${imgName}`, {});
  }

}
