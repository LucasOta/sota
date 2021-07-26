import { Injectable } from '@angular/core';
import { Language } from "../models/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  setLanguage(lang: Language){
    localStorage.setItem('lang', JSON.stringify(lang));
    
    // TODO: change this for this.translate.use(lang);
    window.location.reload();
  }
  getLanguage(): Language{
    var lang = localStorage.getItem('lang');
    if (lang){
      return JSON.parse(lang);
    } else{
      return {
        value: 'en',
        name: 'English',
        icon: '<i class="flag-icon flag-icon-us"></i>'
      } 
    }
    
  }
}
