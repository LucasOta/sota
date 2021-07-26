import { Component, OnInit } from '@angular/core';
import { LanguageSelectorConfig } from 'src/app/shared/components/language-selector/language-selector.component';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {  
  languageSelectorConfig = new LanguageSelectorConfig();
  fullscreen = false;
  
  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
  }

  onLanguageChange(value){
    this.languageService.setLanguage(value);
  };

  toggleFullScreen(){
    this.fullscreen = !this.fullscreen;
  }
  turnOffFullScreen(){
    this.fullscreen = false;
  }

}
