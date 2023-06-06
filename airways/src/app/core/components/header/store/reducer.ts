import { createReducer, on } from '@ngrx/store';

import { IHeaderStateInterface } from '../models/header.interface';
import * as HeaderValuesActions from './actions';

export const initialState: IHeaderStateInterface = {
  choseFormOfDates: 'MM/DD/YYYY',
  choseValutes: 'EUR',
};

export const reducers = createReducer(
  initialState,
  on(HeaderValuesActions.getHeaderValuesSuccess, (state, action) => ({
    ...state,
    choseValute: action,
  })),
);
