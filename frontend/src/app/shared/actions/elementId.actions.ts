import { createAction, props } from '@ngrx/store';

export const set = createAction('[Element Id] Set', props<{ elementId: String }>() );