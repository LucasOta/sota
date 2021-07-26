import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { PipesModule } from "../../../../shared/pipes/pipes.module";
import { TextInputComponent } from './text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultilanguageTextInputComponent } from './multilanguage-text-input/multilanguage-text-input.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropDownListComponent } from './drop-down-list/drop-down-list.component';
import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './blocks/block/block.component';
import { ItemComponent } from './blocks/item/item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextAreaComponent } from './text-area/text-area.component';
import { MultilanguageTextAreaComponent } from './multilanguage-text-area/multilanguage-text-area.component';



@NgModule({
  declarations: [ImagePickerComponent, TextInputComponent, MultilanguageTextInputComponent, CheckboxComponent, DropDownListComponent, BlocksComponent, BlockComponent, ItemComponent, TextAreaComponent, MultilanguageTextAreaComponent],
  exports: [ImagePickerComponent, TextInputComponent, MultilanguageTextInputComponent, CheckboxComponent, DropDownListComponent, BlocksComponent, TextAreaComponent, MultilanguageTextAreaComponent],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule 
  ]
})
export class FormModule { }
