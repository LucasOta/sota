import { createReducer, on } from '@ngrx/store';
import { set, reset } from '../actions/formSubmitted.actions';
 
export const initialState = false;
 
const _formSubmittedReducer = createReducer(
  initialState,
  on(set, (state) => true),
  on(reset, (state) => false)
);
 
export function formSubmittedReducer(state, action) {
  return _formSubmittedReducer(state, action);
}