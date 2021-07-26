import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {
  @Input() textAreaConfig: textAreaConfig;
  submitted$: Observable<Boolean>;
  
  constructor( private store: Store<AppState>) { 
    this.submitted$ = store.select(store => store.formSubmitted);
  }

  ngOnInit(): void {
    if (!this.textAreaConfig.placeholder) this.textAreaConfig.placeholder = this.textAreaConfig.fieldName;
  }

}

export class textAreaConfig extends FormModuleConfig {
  placeholder: string = '';
  formControl: FormControl;
}