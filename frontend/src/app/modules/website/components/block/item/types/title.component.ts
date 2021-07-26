import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-title',
  template: `
    <div class="container">
      <h2 class="pt50">{{item.title[0].quote}}</h2>
    </div>
  `
})
export class TitleComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
