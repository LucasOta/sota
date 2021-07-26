import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

import { FormModule } from "../../components/form/form.module";
import { ComponentsModule } from "../../../../shared/components/components.module";
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ListComponent, FormComponent ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    FormModule,
    ComponentsModule,
    SharedModule
  ]
})
export class CategoriesModule { }
