import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { change } from 'src/app/shared/actions/language.actions';
import { defaultLanguages, Language } from 'src/app/shared/models/language';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-website-language-selector',
  template: `
    <div class="website_lang_sel pt40">
      <span *ngIf="(language$ | async).value === 'en'" (click)="switchLanguage('es')">En</span>
      <span *ngIf="(language$ | async).value === 'es'" (click)="switchLanguage('en')">Es</span>
    </div>
  `,
  styleUrls: ['./website-language-selector.component.css']
})
export class WebsiteLanguageSelectorComponent implements OnInit {
  @Input() onChange: Function;
  language$: Observable<Language>

  constructor(private store: Store<AppState>, private languageService: LanguageService) {
    this.language$ = store.select(store => store.formLanguage);
  }

  ngOnInit(): void {
    this.language$ = this.store.select(store => store.generalLanguage)
    this.store.dispatch(change({ lang: this.languageService.getLanguage() }));
  }

  switchLanguage(lang: string) {
    let selectedlang = defaultLanguages.filter(l => l.value === lang)[0];
    this.store.dispatch(change({ lang: selectedlang }));
    this.onChange(selectedlang);
  }
}
