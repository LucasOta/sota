import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { createTranslationForm } from '../models/translation';
import { Translation } from "./translation";
import { ItemTypes } from "../enums/item";

export class Item {
    _id?: number;
    timestamp?: string;
    typeOfItem: number;

    title?: Translation[];
    subtitle?: Translation[];
    description?: Translation[];
    video?: string;
    img?: string[];
    fullWidth?: boolean;    
    testimonial?: {
        name: string;
        quote?: Translation[];
        jobTitle?: Translation[];

    };

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export function createItemForm(fa: FormArray, i: number, item?: Item){
    let timestamp = Date.now().toString();
    if (item && item.timestamp) timestamp = item.timestamp;
    
    let fg;
    switch (i) {
        case ItemTypes.Title:
            fg = new FormGroup({
                typeOfItem: new FormControl(i),
                title: createTranslationForm() 
              });
            if (item) fg.controls.title.setValue(item.title);            
            break;
      
        case ItemTypes.Text:
            fg = new FormGroup({
                typeOfItem: new FormControl(i),
                title: createTranslationForm(false), 
                subtitle: createTranslationForm(false),
                description: createTranslationForm(false)
              });
            if (item){
                fg.controls.title.setValue(item.title);            
                fg.controls.subtitle.setValue(item.subtitle);            
                fg.controls.description.setValue(item.description);            
            }
            break;
        
          case ItemTypes.Video:
            fg = new FormGroup({
                typeOfItem: new FormControl(i),
                video: new FormControl('', Validators.required)
              });        
            if (item) fg.controls.video.setValue(item.video); 
            break;
        
          case ItemTypes.Image: 
            fg = new FormGroup({
                timestamp: new FormControl(timestamp),
                typeOfItem: new FormControl(i),
                fullWidth: new FormControl(false),
                img: new FormArray([])
              });
            if (item){          
              fg.controls.fullWidth.setValue(item.fullWidth);            
              fg.controls.img.push( new FormControl(item.img[0]));
            }
            break;

          case ItemTypes.ImageGroup:
            fg = new FormGroup({
                timestamp: new FormControl(timestamp),
                typeOfItem: new FormControl(i),
                img: new FormArray([])
              });
              if (item) {
                item.img.forEach(img => {                  
                  fg.controls.img.push( new FormControl(img));
                });
              };            
            break;
          
          case ItemTypes.Testimonial:
            fg = new FormGroup({
                typeOfItem: new FormControl(i),
                testimonial: new FormGroup({
                  name: new FormControl('', Validators.required),
                  quote: createTranslationForm(),
                  jobTitle: createTranslationForm(),
                })
              });
            if (item){
                fg.controls.testimonial.controls.name.setValue(item.testimonial.name);            
                fg.controls.testimonial.controls.quote.setValue(item.testimonial.quote);            
                fg.controls.testimonial.controls.jobTitle.setValue(item.testimonial.jobTitle);            
            }
            break;    
            
          case ItemTypes.TextImage:
            fg = new FormGroup({
                timestamp: new FormControl(timestamp),
                typeOfItem: new FormControl(i),
                img: new FormArray([]),
                title: createTranslationForm(false), 
                subtitle: createTranslationForm(false),
                description: createTranslationForm(false),
              });
            if (item){
                fg.controls.img.push( new FormControl(item.img[0]));
                fg.controls.title.setValue(item.title);            
                fg.controls.subtitle.setValue(item.subtitle);            
                fg.controls.description.setValue(item.description);           
            }
            break;
      
        default:
          console.error(`No Item type specified for enum === ${i}`)
          break;
    }

    fa.push(fg);
}