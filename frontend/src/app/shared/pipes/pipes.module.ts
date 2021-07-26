import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagePipe } from "./image.pipe";
import { DomSanitizerPipe } from "./dom-sanitizer.pipe";
import { SafePipe } from "./safe.pipe";


@NgModule({
  declarations: [ ImagePipe, DomSanitizerPipe, SafePipe],
  exports: [ ImagePipe, DomSanitizerPipe, SafePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
