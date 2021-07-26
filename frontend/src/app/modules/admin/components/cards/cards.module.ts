import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardFooterComponent } from "./card-footer/card-footer.component";
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CardFooterComponent],
  exports: [CardFooterComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CardsModule { }
