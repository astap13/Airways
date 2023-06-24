import { createReducer } from '@ngrx/store';

import { IBookingStateInterface } from '../models/booking.interface';

export const initialState: IBookingStateInterface = {
  selectedWay: false,
  selectedFromCity: '',
  selectedDestinationCity: '',
  selectedDate: {
    fromDate: {
      year: 0,
      month: 0,
      day: 0,
    },
    toDate: {
      year: 0,
      month: 0,
      day: 0,
    },
  },
  selectedPassengers: {
    adult: 1,
    child: 0,
    infant: 0,
  },
};

export const reducer = createReducer(
  initialState,
  //     , on(bookingValueActions.getBookingValues, state => {
  //     ...state, selectedWay: false,
  // })
);
