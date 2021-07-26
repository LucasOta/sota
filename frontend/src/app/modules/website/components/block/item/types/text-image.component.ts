import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-text-image',
  template: `
    <div class="dk-box-2 dk-padding-bot">
      <div class="container">
        <div class="row align-items-center justify-content-between vertical-gap mt-60">
          <div class="col-lg-5 order-lg-1">
              <div class="dk-box">
                <h2 class="pt50">{{item.title[0].quote}}</h2>
                <h4 class="pt40">{{item.subtitle[0].quote}}</h4>
                <p class="pt30">{{item.description[0].quote}}</p>
              </div>
              <div class="dk-gap d-block d-lg-none mnt-5"></div>
          </div>
          <div class="col-lg-6">
              <img class="dk-img" [src]="(item.img[0] | image : (moduleName$ | async) : (elementId$ | async))" alt="">
          </div>
        </div>
      </div>
    </div>
  `
})
export class TextImageComponent implements OnInit {
  @Input() item: Item;
  moduleName$: Observable<String>;
  elementId$: Observable<String>;  
  
  constructor( private store: Store<AppState> ) {
    this.moduleName$ = store.select(store => store.moduleName);
    this.elementId$ = store.select(store => store.elementId);
  }

  ngOnInit(): void {
  }

}
