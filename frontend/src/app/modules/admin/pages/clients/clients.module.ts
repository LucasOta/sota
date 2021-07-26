import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../../components/form/form.module';
import { CardsModule } from '../../components/cards/cards.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FormComponent, ListComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    FormModule,
    CardsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class ClientsModule { }
