import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { ItemTypes } from 'src/app/shared/enums/item';

@Component({
  selector: 'app-item',
  template: `
    <ng-container [ngSwitch]="item.typeOfItem">
        
        <app-title          *ngSwitchCase="itemTypes.Title"         [item]='item'></app-title>
        <app-text           *ngSwitchCase="itemTypes.Text"          [item]='item'></app-text>
        <app-video          *ngSwitchCase="itemTypes.Video"         [item]='item'></app-video>
        <app-image          *ngSwitchCase="itemTypes.Image"         [item]='item'></app-image>
        <app-image-group    *ngSwitchCase="itemTypes.ImageGroup"    [item]='item'></app-image-group>
        <app-testimonial    *ngSwitchCase="itemTypes.Testimonial"   [item]='item'></app-testimonial>
        <app-text-image     *ngSwitchCase="itemTypes.TextImage"     [item]='item'></app-text-image>
        
        <!-- Default -->
        <ng-container *ngSwitchDefault>
            <h3 style="color: red;">Unknown ItemType</h3>
        </ng-container>
        
    </ng-container>
  `
})
export class ItemComponent implements OnInit {
  @Input() item: Item;  
  itemTypes = ItemTypes;

  constructor() { }

  ngOnInit(): void {
  }

}
