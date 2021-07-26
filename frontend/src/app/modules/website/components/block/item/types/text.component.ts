import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-text',
  template: `  
    <div class="container">
      <h2 class="pt50">{{item.title[0].quote}}</h2>
      <h4 class="pt40">{{item.subtitle[0].quote}}</h4>
      <div class="row justify-content-between vertical-gap">
          <div class="col-12">
              <p class="pt30">{{item.description[0].quote}}</p>
          </div>
      </div>
    </div>
  `
})
export class TextComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
