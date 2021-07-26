import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'panel';
  
  constructor(
    translate: TranslateService, 
    private languageService: LanguageService,
    public router: Router) {

    translate.setDefaultLang('en');
    translate.use(this.languageService.getLanguage().value);
  }

}
