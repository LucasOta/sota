import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() checkboxConfig: CheckboxConfig;
  submitted$: Observable<Boolean>;
  
  constructor( private store: Store<AppState>) { 
    this.submitted$ = store.select(store => store.formSubmitted);
  }

  ngOnInit(): void {
  }

}

export class CheckboxConfig extends FormModuleConfig {
  formControl: FormControl;
}
