import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css']
})
export class CardFooterComponent implements OnInit {
  @Input() cardFooterConfig: CardFooterConfig;

  constructor() { } 

  ngOnInit(): void {}

}

export class CardFooterConfig {
  cancelAction: Function = function(){};
  deleteAction: Function = function(){};
  scope: this;
  id: string;
}
