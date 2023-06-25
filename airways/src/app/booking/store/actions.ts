import { createAction, props } from '@ngrx/store';

export const getBookingValues = createAction('[BookingValues] Get Booking Values');

export const setSelectedWay = createAction(
  '[BookingValues] Set Selected Way',
  props<{ selectedWay: boolean }>(),
);
