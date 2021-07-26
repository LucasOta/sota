import { createAction, props } from '@ngrx/store';
import { Language } from "../models/language";

export const formLangChange = createAction('[Form Language Component] Change', props<{ lang: Language }>() );