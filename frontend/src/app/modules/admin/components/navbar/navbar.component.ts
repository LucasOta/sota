import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../core/authentication/authentication.service';
import { LanguageService } from '../../../../shared/services/language.service';
import { LanguageSelectorConfig } from "../../../../shared/components/language-selector/language-selector.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  languageSelectorConfig = new LanguageSelectorConfig();

  constructor(
    private authenticationService: AuthenticationService,
    private languageService: LanguageService,
    ) { 
      var scope = this;
      this.languageSelectorConfig.form = false;
      this.languageSelectorConfig.onChange = function(value){
        scope.languageService.setLanguage(value);
      };
    }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.logout();
  }

}
