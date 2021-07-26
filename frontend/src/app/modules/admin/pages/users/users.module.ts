import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../../components/form/form.module';
import { CardsModule } from '../../components/cards/cards.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormModule,
    CardsModule,
    ComponentsModule,
    SharedModule,    
    PipesModule
  ]
})
export class UsersModule { }
