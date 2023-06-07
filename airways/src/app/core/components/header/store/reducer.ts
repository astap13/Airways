import { createReducer, on } from '@ngrx/store';

import { IHeaderStateInterface } from '../models/header.interface';
import * as HeaderValuesActions from './actions';

export const initialState: IHeaderStateInterface = {
  selectedFormOfDates: 'MM/DD/YYYY',
  selectedValutes: 'EUR',
};

export const reducers = createReducer(
  initialState,
  on(HeaderValuesActions.getHeaderValuesSuccess, (state, action) => ({
    ...state,
    selectedFormOfDates: action.headerValues.selectedFormOfDates,
    selectedValutes: action.headerValues.selectedValutes,
  })),
  on(HeaderValuesActions.setSelectedFormOfDates, (state, action) => ({
    ...state,
    selectedFormOfDates: action.selectedFormOfDates,
  })),
  on(HeaderValuesActions.setSelectedValutes, (state, action) => ({
    ...state,
    selectedValutes: action.selectedValutes,
  })),
);
