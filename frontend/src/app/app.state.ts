import { Language } from './shared/models/language';

export interface AppState {
  readonly formLanguage: Language;
  readonly generalLanguage: Language;
  readonly formSubmitted: Boolean;
  readonly moduleName: String;
  readonly elementId: String;
}