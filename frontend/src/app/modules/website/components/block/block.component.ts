import { Component, Input, OnInit } from '@angular/core';
import { Block } from 'src/app/shared/models/project';

@Component({
  selector: 'app-block',
  template:`
    <div class="dk-box-1" [ngStyle]="{'color': block.fontColor, 'background-color':block.bgColor }">
      <ng-container *ngFor="let item of block.items">
          <app-item [item]='item'></app-item>
      </ng-container>    
    </div>
  `
})
export class BlockComponent implements OnInit {
  @Input() block: Block;
  constructor() { }

  ngOnInit(): void {
  }

}
