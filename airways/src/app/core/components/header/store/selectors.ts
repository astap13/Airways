import { createSelector } from '@ngrx/store';

import { IAppStateInterface } from 'src/app/redux/appState.interface';

export const selectFeature = (state: IAppStateInterface) => state.header;

export const isLoadingSelectedValuteSelector = createSelector(
  selectFeature,
  (state) => state.selectedValutes,
);

export const isLoadingSelectedFormDateSelector = createSelector(
  selectFeature,
  (state) => state.selectedFormOfDates,
);

export const isLoadingStep = createSelector(selectFeature, (state) => state.step);
