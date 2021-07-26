import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.css']
})
export class DropDownListComponent implements OnInit {
  @Input() dropDownListInputConfig: DropDownListInputConfig;
  submitted$: Observable<Boolean>;

  constructor( private store: Store<AppState>) { 
    this.submitted$ = store.select(store => store.formSubmitted);
  }

  ngOnInit(): void {
  }

}

export class DropDownListInputConfig extends FormModuleConfig {
  submitted: boolean = false;
  options: Option[];
  formControl: FormControl;
}

class Option{
  key: String;
  value: String;
}