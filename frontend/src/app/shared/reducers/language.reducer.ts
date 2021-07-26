import { createReducer, on } from '@ngrx/store';
import { change } from '../actions/language.actions';
import { defaultLanguages } from "../models/language";
 
export const initialState = defaultLanguages[0];
 
const _languageReducer = createReducer(
  initialState,
  on(change, (state, { lang }) => lang )
);
 
export function languageReducer(state, action) {
  return _languageReducer(state, action);
}