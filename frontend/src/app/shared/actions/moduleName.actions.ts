import { createAction, props } from '@ngrx/store';

export const set = createAction('[Module Name] Set', props<{ moduleName: String }>() );