import { createReducer, on } from '@ngrx/store';
import { set } from '../actions/elementId.actions';
 
export const initialState = '';
 
const _elementIdReducer = createReducer(
  initialState,
  on(set, (state, { elementId }) => elementId )
);
 
export function elementIdReducer(state, action) {
  return _elementIdReducer(state, action);
}