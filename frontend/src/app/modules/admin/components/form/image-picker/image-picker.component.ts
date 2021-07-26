import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FileService } from 'src/app/core/http/file/file.service';
import { Image } from 'src/app/shared/models/image';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {
  @Input() imgPickerConfig: ImgPickerConfig;
  @ViewChild('inputFile') inputFile: ElementRef;
  moduleName$: Observable<String>;
  elementId$: Observable<String>;  
  imgs: Image[] = [];
  
  constructor( private fileService: FileService, private store: Store<AppState> ) {
    this.moduleName$ = store.select(store => store.moduleName);
    this.elementId$ = store.select(store => store.elementId);
  }

  ngOnInit(): void {
    if (this.imgPickerConfig.timestamp) {
      this.imgPickerConfig.prefix = `${this.imgPickerConfig.prefix}_${this.imgPickerConfig.timestamp}`
    }
  }

  ngOnDestroy(): void {
    this.deleteTemps();
  }

  onSelectFile(e){
    const tempImg = new Image();

    if (e.target.files) {      
      tempImg.name = e.target.files[0].name; 

      this.fileService.uploadFile(e.target.files[0], this.imgPickerConfig.prefix).subscribe(res=>{
        tempImg.name = res.file.name; 
        
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          tempImg.url = event.target.result;
          
          this.imgs.push(tempImg);
          this.imgPickerConfig.formArray.push(new FormControl(tempImg.name));
        }

      })
    }
  }

  // TODO: not allow to upload the same img name twice
  trackByFn(index, item) {    
    return item.name; // unique id corresponding to the item
  }

  uploadFile(){
    this.inputFile.nativeElement.click();
  }

  deleteImg(img: string){
    const initialImgsLength = this.imgs.length;
    this.imgs = this.imgs.filter(i => i.name != img );
    this.deleteOnFormArray(img);

    if (initialImgsLength != this.imgs.length) {
      this.fileService.deleteTemp(img).subscribe(res=>{});
    } else {
      // We must not delete the image now in case the user wants to discard the changes,
      // the backend will delete the imgs when the class is updated.    
    }
  }
  
  deleteOnFormArray(img: string){
    let faValue = this.imgPickerConfig.formArray.value;
    const faValIndex = faValue.findIndex(e => e === img);
    this.updateOldImgs(img);
    this.imgPickerConfig.formArray.removeAt(faValIndex);

  }
  
  updateOldImgs(img: string){
    const oldImgIndex = this.imgPickerConfig.oldImages.findIndex(e => e === img);
    if (oldImgIndex >= 0) {
      this.imgPickerConfig.oldImages.splice(oldImgIndex, 1);
      return true;
    } else {
      return false;
    }
  }

  deleteTemps(){
    this.imgs.forEach(img => {
      if (img.justUploaded) {
        this.fileService.deleteTemp(img.name).subscribe(res=>{});
      }     
    });
  }

}

export class ImgPickerConfig extends FormModuleConfig{
  maxImgs: number = -1;
  prefix: string = '';
  timestamp: string = '';
  formArray: FormArray = new FormArray([]);
  oldImages: string[] = [];

  setImgs = function(imgs: any){    
    this.formArray.clear();
    if (typeof imgs == 'string'){
      this.formArray.push(new FormControl(imgs));
    } else {
      imgs.forEach(img => this.formArray.push(new FormControl(img)));
    }
    this.oldImages = this.formArray.value;
  }
}
