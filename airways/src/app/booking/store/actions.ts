import { createAction, props } from '@ngrx/store';

export const getBookingValues = createAction('[BookingValues] Get Booking Values');

export const setSelectedWay = createAction(
  '[BookingValues] Set Selected Way',
  props<{ selectedWay: boolean }>(),
);

export const setSelectedFromCity = createAction(
  '[BookingValues] Set Selected From City',
  props<{ selectedFromCity: string }>(),
);

export const setSelectedDestinationCity = createAction(
  '[BookingValues] Set Selected Destination City',
  props<{ selectedDestinationCity: string }>(),
);
