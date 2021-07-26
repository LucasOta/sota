import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  @Input() blocks: FormArray;

  constructor() { }

  ngOnInit(): void {
  }

  addBlock(){
    this.blocks.push(
      new FormGroup({
        bgColor: new FormControl('#FFF'),
        fontColor: new FormControl('#000'),
        items: new FormArray([])
      })
    )
  }
  
  deleteBlock(index: number){
    this.blocks.removeAt(index);
  }

  drop(event: CdkDragDrop<FormGroup[]>){
    const auxBlock = this.blocks.at(event.previousIndex);
    this.blocks.removeAt(event.previousIndex)
    this.blocks.insert(event.currentIndex, auxBlock);    
  }

}
