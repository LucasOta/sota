import { createReducer, on } from '@ngrx/store';
import { formLangChange } from '../actions/formLanguage.actions';
import { defaultLanguages } from "../models/language";
 
export const initialState = defaultLanguages[0];
 
const _formLanguageReducer = createReducer(
  initialState,
  on(formLangChange, (state, { lang }) => lang )
);
 
export function formLanguageReducer(state, action) {
  return _formLanguageReducer(state, action);
}