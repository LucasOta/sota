import { createReducer, on } from '@ngrx/store';
import { set } from '../actions/moduleName.actions';
 
export const initialState = '';
 
const _moduleNameReducer = createReducer(
  initialState,
  on(set, (state, { moduleName }) => moduleName )
);
 
export function moduleNameReducer(state, action) {
  return _moduleNameReducer(state, action);
}