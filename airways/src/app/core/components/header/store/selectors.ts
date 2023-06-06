import { createSelector } from '@ngrx/store';

import { IAppStateInterface } from 'src/app/redux/appState.interface';

export const selectFeature = (state: IAppStateInterface) => state.header;

export const isLoadingChoseValuteSelector = createSelector(
  selectFeature,
  (state) => state.choseValutes,
);

export const isLoadingChoseFormDateSelector = createSelector(
  selectFeature,
  (state) => state.choseFormOfDates,
);
