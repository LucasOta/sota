import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkComponent } from './pages/work/work.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WorkPreviewComponent } from './components/work-preview/work-preview.component';
import { PipesModule } from "../../shared/pipes/pipes.module";
import { WorkViewComponent } from './pages/work-view/work-view.component';
import { BlockComponent } from './components/block/block.component';
import { ItemComponent } from './components/block/item/item.component';
import { TitleComponent } from './components/block/item/types/title.component';
import { TextComponent } from './components/block/item/types/text.component';
import { VideoComponent } from './components/block/item/types/video.component';
import { ImageComponent } from './components/block/item/types/image.component';
import { ImageGroupComponent } from './components/block/item/types/image-group.component';
import { TestimonialComponent } from './components/block/item/types/testimonial.component';
import { TextImageComponent } from './components/block/item/types/text-image.component';

import { ComponentsModule } from "../../shared/components/components.module";
import { SharedModule } from 'src/app/shared/shared.module';
import { WebsiteLanguageSelectorComponent } from './components/website-language-selector/website-language-selector.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebsiteComponent, 
    HomeComponent, 
    FooterComponent, 
    NavbarComponent, 
    WorkComponent, 
    AboutComponent, 
    ContactComponent, 
    WorkPreviewComponent, 
    WorkViewComponent, 
    BlockComponent, 
    ItemComponent, 
    TitleComponent, 
    TextComponent, 
    VideoComponent, 
    ImageComponent, 
    ImageGroupComponent, 
    TestimonialComponent, 
    TextImageComponent, 
    WebsiteLanguageSelectorComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ComponentsModule,
    PipesModule,
    SharedModule,
    MatSelectModule,
    FormsModule,
    SharedModule
  ]
})
export class WebsiteModule { }
