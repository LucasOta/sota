import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/pages/not-found/not-found.component';
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { LanguageInterceptor } from "./core/interceptors/language.interceptor";
import { AlertInterceptor } from "./core/interceptors/alert.interceptor";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";

import { StoreModule } from '@ngrx/store';
import { languageReducer } from "./shared/reducers/language.reducer";
import { formLanguageReducer } from "./shared/reducers/formLanguage.reducer";
import { formSubmittedReducer } from "./shared/reducers/formSubmitted.reducer";
import { moduleNameReducer } from "./shared/reducers/moduleName.reducer";
import { elementIdReducer } from "./shared/reducers/elementId.reducer";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      formLanguage: formLanguageReducer, 
      generalLanguage: languageReducer,
      formSubmitted: formSubmittedReducer,
      moduleName: moduleNameReducer,
      elementId: elementIdReducer
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass: LanguageInterceptor,
    multi   : true,
  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass: AlertInterceptor,
    multi   : true,
  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi   : true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
