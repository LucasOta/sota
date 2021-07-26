import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from "../../../app.state";
import { change } from "../../actions/language.actions";
import { formLangChange } from "../../actions/formLanguage.actions";
import { Language, defaultLanguages } from "../../models/language";
import { LanguageService } from "../../services/language.service";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  @Input() languageSelectorConfig: LanguageSelectorConfig;  
  language$: Observable<Language>

  constructor(private store: Store<AppState>, private languageService:LanguageService) {
      this.language$ = store.select(store => store.formLanguage);
  }

  ngOnInit(): void {
    if(!this.languageSelectorConfig.languages){
      this.languageSelectorConfig.languages = defaultLanguages;
    }
    if (!this.languageSelectorConfig.form) {
      this.language$ = this.store.select(store => store.generalLanguage)
      this.store.dispatch(change({lang: this.languageService.getLanguage()}));
    }
  }

  formLang = 'en';
  @HostListener('document:keydown.control.i') toggleLang(event: KeyboardEvent) {
      if (this.languageSelectorConfig.form){
        console.log('Change language', event);
        if (this.formLang === 'en') {
          this.store.dispatch(formLangChange({lang: defaultLanguages[1]}));
          this.formLang = 'es';
        } else {
          this.formLang = 'en';
          this.store.dispatch(formLangChange({lang: defaultLanguages[0]}));
        }
      }
  }

  setSelectedLanguage(lang: Language){
    this.languageSelectorConfig.form ? this.store.dispatch(formLangChange({lang})) : this.store.dispatch(change({lang}));
    if (!this.languageSelectorConfig.form) this.languageSelectorConfig.onChange(lang);
  }
}

export class LanguageSelectorConfig {
  form = true; //False means that is the general language selector
  languages?: Language[];
  onChange: Function;
}
