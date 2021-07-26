import { createAction, props } from '@ngrx/store';
import { Language } from "../models/language";

export const change = createAction('[Language Component] Change', props<{ lang: Language }>() );