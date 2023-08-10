import { createSelector } from '@ngrx/store';

import { IAppStateInterface } from 'src/app/redux/appState.interface';

export const selectFeature = (state: IAppStateInterface) => state.booking;

export const selectedBookingValues = createSelector(selectFeature, (state) => state);

export const selectedWaySelector = createSelector(selectFeature, (state) => state.selectedWay);

export const selectedFromCitySelector = createSelector(
  selectFeature,
  (state) => state.selectedFromCity,
);

export const selectedDestinationCitySelector = createSelector(
  selectFeature,
  (state) => state.selectedDestinationCity,
);

export const selectedFromDate = createSelector(
  selectFeature,
  (state) => state.selectedDate.fromDate,
);

export const selectedToDate = createSelector(selectFeature, (state) => state.selectedDate.toDate);

export const selectedPassengers = createSelector(
  selectFeature,
  (state) => state.selectedPassengers,
);

export const selectedAdultPassengers = createSelector(
  selectFeature,
  (state) => state.selectedPassengers.adult,
);

export const selectedChildPassengers = createSelector(
  selectFeature,
  (state) => state.selectedPassengers.child,
);

export const selectedInfantPassengers = createSelector(
  selectFeature,
  (state) => state.selectedPassengers.infant,
);

export const selectedToFright = createSelector(selectFeature, (state) => state.selectedToFlight);

export const selectedReturnFright = createSelector(
  selectFeature,
  (state) => state.selectedReturnFlight,
);
