import { createAction, props } from '@ngrx/store';

import { IHeaderStateInterface } from '../models/header.interface';

export const getHeaderValues = createAction('[HeaderValues] Get HeaderValues');
export const getHeaderValuesSuccess = createAction(
  '[HeaderValues] Get HeaderValues success',
  props<{ HeaderValues: IHeaderStateInterface }>(),
);
export const getHeaderValuesFailure = createAction(
  '[HeaderValues] Get HeaderValues failure',
  props<{ error: string }>(),
);
