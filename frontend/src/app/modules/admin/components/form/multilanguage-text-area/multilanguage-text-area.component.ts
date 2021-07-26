import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Language } from 'src/app/shared/models/language';
import { FormModuleConfig } from '../form.config';
import { textAreaConfig } from "../text-area/text-area.component";

@Component({
  selector: 'app-multilanguage-text-area',
  template: `
    <app-text-area *ngIf="(language$ | async).value === 'en'" [textAreaConfig]="textAreaConfigEn"></app-text-area>
    <app-text-area *ngIf="(language$ | async).value === 'es'" [textAreaConfig]="textAreaConfigEs"></app-text-area>
    <app-text-area *ngIf="(language$ | async).value === 'de'" [textAreaConfig]="textAreaConfigDe"></app-text-area>
  `
})
export class MultilanguageTextAreaComponent implements OnInit {
  @Input() multilanguageTextAreaConfig: MultilanguageTextAreaConfig; 
  
  language$: Observable<Language>

  
  textAreaConfigEn = new textAreaConfig();
  textAreaConfigEs = new textAreaConfig();
  textAreaConfigDe = new textAreaConfig();

  constructor( private store: Store<AppState>) { 
    this.language$ = store.select(store => store.formLanguage);
  }

  ngOnInit(): void {
    if (!this.multilanguageTextAreaConfig.placeholder) this.multilanguageTextAreaConfig.placeholder = this.multilanguageTextAreaConfig.fieldName;
    this.initializeComponents();
  }

  setValue(){
    this.textAreaConfigEn.formControl = this.multilanguageTextAreaConfig.formArray.at(0).get('quote') as FormControl;
    this.textAreaConfigEs.formControl = this.multilanguageTextAreaConfig.formArray.at(1).get('quote') as FormControl;
    this.textAreaConfigDe.formControl = this.multilanguageTextAreaConfig.formArray.at(2).get('quote') as FormControl;
  }

  private initializeComponents(){

    this.textAreaConfigEn.fieldName = this.multilanguageTextAreaConfig.fieldName;
    this.textAreaConfigEn.required = this.multilanguageTextAreaConfig.required;
    this.textAreaConfigEn.placeholder = `${ this.multilanguageTextAreaConfig.placeholder } in English`;

    this.textAreaConfigEs.fieldName = this.multilanguageTextAreaConfig.fieldName;
    this.textAreaConfigEs.required = false;
    this.textAreaConfigEs.placeholder = `${ this.multilanguageTextAreaConfig.placeholder } in Spanish`;

    this.textAreaConfigDe.fieldName = this.multilanguageTextAreaConfig.fieldName;
    this.textAreaConfigDe.required = false;
    this.textAreaConfigDe.placeholder = `${ this.multilanguageTextAreaConfig.placeholder } in German`;

    this.setValue();
  }

}

export class MultilanguageTextAreaConfig extends FormModuleConfig {
  formArray: FormArray;
  placeholder: string = '';
  selectedLanguage: string;
}