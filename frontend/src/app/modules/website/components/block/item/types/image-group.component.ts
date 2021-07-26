import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-image-group',
  template: `
    <div class="dk-box-2 dk-padding-bot">
      <div class="container">
          <div class="row vertical-gap dk-gallery">
              <div *ngFor="let img of item.img"
              [ngClass]="{
                'col-md-12': item.img.length === 1,
                'col-md-6': item.img.length === 2,
                'col-md-4': item.img.length === 3
              }">
                  <a class="dk-gallery-item">
                      <img class="dk-img" [src]="(img | image : (moduleName$ | async) : (elementId$ | async))" alt="">
                  </a>
              </div>

          </div>
      </div>
    </div>
  `
})
export class ImageGroupComponent implements OnInit {
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
