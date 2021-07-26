import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ItemTypes, ItemElements } from 'src/app/shared/enums/item';
import { MultilanguageTextInputConfig } from '../../multilanguage-text-input/multilanguage-text-input.component';
import { TextInputConfig } from '../../text-input/text-input.component';
import { CheckboxConfig } from '../../checkbox/checkbox.component';
import { ImgPickerConfig } from '../../image-picker/image-picker.component';
import { MultilanguageTextAreaConfig } from '../../multilanguage-text-area/multilanguage-text-area.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: FormGroup;
  itemTypes = ItemTypes;
  itemElements = ItemElements;
  properties = [];

  // Elements
  titleMultilanguageInputConfig = new MultilanguageTextInputConfig();
  subtitleMultilanguageInputConfig = new MultilanguageTextInputConfig();
  descMultilanguageAreaConfig = new MultilanguageTextAreaConfig();

  quoteMultilanguageAreaConfig = new MultilanguageTextInputConfig();
  jobTitleMultilanguageInputConfig = new MultilanguageTextInputConfig();
  nameTextInputConfig = new TextInputConfig();

  videoTextInputConfig = new TextInputConfig();

  fullWidthCheckboxConfig = new CheckboxConfig();
  imgPickerConfig = new ImgPickerConfig();

  constructor() {} 

  ngOnInit(): void {
    this.setProperties();    
    this.initializeComponents();
  }

  private initializeComponents(){
    if (this.show(ItemElements.Title)){
      this.titleMultilanguageInputConfig.fieldName = 'Title';
      this.titleMultilanguageInputConfig.formArray = this.item.get('title') as FormArray;
    }
    
    if (this.show(ItemElements.Subtitle)){
      this.subtitleMultilanguageInputConfig.fieldName = 'Subtitle';
      this.subtitleMultilanguageInputConfig.formArray = this.item.get('subtitle') as FormArray;

    }
    if (this.show(ItemElements.Description)){
      this.descMultilanguageAreaConfig.fieldName = 'Description';
      this.descMultilanguageAreaConfig.formArray = this.item.get('description') as FormArray;
    }

    if (this.show(ItemElements.Video)){
      this.videoTextInputConfig.fieldName = 'Video';
      this.videoTextInputConfig.required = true;
      this.videoTextInputConfig.placeholder = 'Link to Video';
      this.videoTextInputConfig.formControl = this.item.get('video') as FormControl; 
    }

    if (this.show(ItemElements.Image)){
      this.imgPickerConfig.fieldName = 'Images';
      this.imgPickerConfig.prefix = 'item';
      this.imgPickerConfig.timestamp = this.item.get('timestamp').value;
      this.imgPickerConfig.maxImgs = 3;
      this.imgPickerConfig.formArray = this.item.get('img') as FormArray;
      this.imgPickerConfig.setImgs(this.item.get('img').value);

    }
    if (this.show(ItemElements.Image) && this.show(ItemElements.FullWidth)){
      this.fullWidthCheckboxConfig.formControl = this.item.get('fullWidth') as FormControl;
      this.fullWidthCheckboxConfig.fieldName = 'Full Width'; 

      this.imgPickerConfig.maxImgs = 1; 
    }

    if (this.show(ItemElements.Testimonial)){
      this.quoteMultilanguageAreaConfig.fieldName = 'Quote';
      this.quoteMultilanguageAreaConfig.required = true;
      this.quoteMultilanguageAreaConfig.formArray = (this.item.get('testimonial') as FormGroup).controls.quote as FormArray; 

      this.jobTitleMultilanguageInputConfig.fieldName = 'Job title';
      this.jobTitleMultilanguageInputConfig.required = true;
      this.jobTitleMultilanguageInputConfig.formArray = (this.item.get('testimonial') as FormGroup).controls.jobTitle as FormArray; 

      this.nameTextInputConfig.fieldName = 'Name';
      this.nameTextInputConfig.required = true;
      this.nameTextInputConfig.formControl = (this.item.get('testimonial') as FormGroup).controls.name as FormControl; 
    }

  }

  show(el: number){
    return this.properties.includes(el);
  }

  setProperties(){
    switch (this.item.get('typeOfItem').value) {
      case ItemTypes.Title:
        this.properties = [ItemElements.Title];
        break;
    
      case ItemTypes.Text:
        this.properties = [ItemElements.Title, ItemElements.Subtitle, ItemElements.Description];        
        break;
      
      case ItemTypes.Video:
        this.properties = [ItemElements.Video];  
        break;
    
      case ItemTypes.Image:
        this.properties = [ItemElements.Image, ItemElements.FullWidth];
        break;
      
      case ItemTypes.ImageGroup:
        this.properties = [ItemElements.Image];
        break;
      
      case ItemTypes.Testimonial:
        this.properties = [ItemElements.Testimonial];
        break;
      
      case ItemTypes.TextImage:
        this.properties = [ItemElements.Title, ItemElements.Subtitle, ItemElements.Description, ItemElements.Image];
        break;
    }
  }

}
