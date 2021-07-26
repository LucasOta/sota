import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TextInputConfig } from '../../text-input/text-input.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ItemTypes } from "src/app/shared/enums/item";
import { createItemForm } from "src/app/shared/models/item";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() block: FormGroup;
  itemTypesForTemplate = ItemTypes;

  bgColorTextInputConfig = new TextInputConfig();
  fontColorTextInputConfig = new TextInputConfig();

  constructor() {}
  
  ngOnInit(): void {
    this.initializeComponents();
  }

  addItem(i: number){
    createItemForm((this.block.controls['items'] as FormArray), i);    
  }

  deleteItem(index: number){
    (this.block.controls['items'] as FormArray).removeAt(index);
  }

  drop(event: CdkDragDrop<FormGroup[]>){
    const auxBlock = (this.block.controls['items'] as FormArray).at(event.previousIndex);
    (this.block.controls['items'] as FormArray).removeAt(event.previousIndex);
    (this.block.controls['items'] as FormArray).insert(event.currentIndex, auxBlock);    
  }

  private initializeComponents(){

    this.bgColorTextInputConfig.fieldName = 'bgColor';
    this.bgColorTextInputConfig.required = true;
    this.bgColorTextInputConfig.placeholder = 'Background Color';
    this.bgColorTextInputConfig.formControl = this.block.get('bgColor') as FormControl; 
    
    this.fontColorTextInputConfig.fieldName = 'color';
    this.fontColorTextInputConfig.required = true;
    this.fontColorTextInputConfig.placeholder = 'Font Color';
    this.fontColorTextInputConfig.formControl = this.block.get('fontColor') as FormControl; 

  }

}
