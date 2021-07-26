import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-video',
  styles:[
    `
    .video-cover {
      position: relative;
      padding-bottom: 56.25%;
    }
    
    iframe{
      border: none;
      background: #232323;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    `
  ],
  template: `  
    <div class="container">      
      <div class="video-cover">        
        <iframe [src]='item.video | safe' allowfullscreen="allowfullscreen"></iframe>
      </div>
    </div>

  `
})
export class VideoComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
