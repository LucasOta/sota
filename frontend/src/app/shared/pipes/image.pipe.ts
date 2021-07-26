import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  
  transform( fileName: string, moduleName: string, elementId: string ): string {
    return `${URL}/file/image/${moduleName}/${elementId}/${fileName}`;
  }

}
