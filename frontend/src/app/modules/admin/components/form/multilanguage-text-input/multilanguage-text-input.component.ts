import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TextInputConfig } from '../text-input/text-input.component';
import { Language } from 'src/app/shared/models/language';
import { FormModuleConfig } from '../form.config';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-multilanguage-text-input',
  template: `
    <app-text-input *ngIf="(language$ | async).value === 'en'" [textInputConfig]="textInputConfigEn"></app-text-input>
    <app-text-input *ngIf="(language$ | async).value === 'es'" [textInputConfig]="textInputConfigEs"></app-text-input>
    <app-text-input *ngIf="(language$ | async).value === 'de'" [textInputConfig]="textInputConfigDe"></app-text-input>
  `
})
export class MultilanguageTextInputComponent implements OnInit {
  @Input() multilanguageTextInputConfig: MultilanguageTextInputConfig; 
  
  language$: Observable<Language>

  
  textInputConfigEn = new TextInputConfig();
  textInputConfigEs = new TextInputConfig();
  textInputConfigDe = new TextInputConfig();

  constructor( private store: Store<AppState>) { 
    this.language$ = store.select(store => store.formLanguage);
  }

  ngOnInit(): void {
    if (!this.multilanguageTextInputConfig.placeholder) this.multilanguageTextInputConfig.placeholder = this.multilanguageTextInputConfig.fieldName;
    this.initializeComponents();
  }

  setValue(){
    this.textInputConfigEn.formControl = this.multilanguageTextInputConfig.formArray.at(0).get('quote') as FormControl;
    this.textInputConfigEs.formControl = this.multilanguageTextInputConfig.formArray.at(1).get('quote') as FormControl;
    this.textInputConfigDe.formControl = this.multilanguageTextInputConfig.formArray.at(2).get('quote') as FormControl;
  }

  private initializeComponents(){

    this.textInputConfigEn.fieldName = this.multilanguageTextInputConfig.fieldName;
    this.textInputConfigEn.required = this.multilanguageTextInputConfig.required;
    this.textInputConfigEn.placeholder = `${ this.multilanguageTextInputConfig.placeholder } in English`;

    this.textInputConfigEs.fieldName = this.multilanguageTextInputConfig.fieldName;
    this.textInputConfigEs.required = false;
    this.textInputConfigEs.placeholder = `${ this.multilanguageTextInputConfig.placeholder } in Spanish`;

    this.textInputConfigDe.fieldName = this.multilanguageTextInputConfig.fieldName;
    this.textInputConfigDe.required = false;
    this.textInputConfigDe.placeholder = `${ this.multilanguageTextInputConfig.placeholder } in German`;

    this.setValue();
  }

}

export class MultilanguageTextInputConfig extends FormModuleConfig {
  formArray: FormArray;
  placeholder: string = '';
  selectedLanguage: string;
}
