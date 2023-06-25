import { createSelector } from '@ngrx/store';

import { IAppStateInterface } from 'src/app/redux/appState.interface';

export const selectFeature = (state: IAppStateInterface) => state.booking;

export const selectedWaySelector = createSelector(selectFeature, (state) => state.selectedWay);

export const selectedFromCitySelector = createSelector(
  selectFeature,
  (state) => state.selectedFromCity,
);

export const selectedDestinationCitySelector = createSelector(
  selectFeature,
  (state) => state.selectedDestinationCity,
);
