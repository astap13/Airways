import { createAction, props } from '@ngrx/store';

import { IHeaderStateInterface } from '../models/header.interface';

export const getHeaderValues = createAction('[HeaderValues] Get HeaderValues');
export const getHeaderValuesSuccess = createAction(
  '[HeaderValues] Get HeaderValues success',
  props<{ headerValues: IHeaderStateInterface }>(),
);

export const setSelectedFormOfDates = createAction(
  '[HeaderValues] Set Selected Form of Dates',
  props<{ selectedFormOfDates: string }>(),
);

export const setSelectedValutes = createAction(
  '[HeaderValues] Set Selected Valutes',
  props<{ selectedValutes: string }>(),
);
