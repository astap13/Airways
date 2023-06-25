import { createReducer, on } from '@ngrx/store';

import { IBookingStateInterface } from '../models/booking.interface';
import * as BookingValuesActions from '../store/actions';

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
  on(BookingValuesActions.getBookingValues, (state) => ({
    ...state,
    // selectedWay: action.bookingValues.selectedWay,
    // selectedFromCity: action.bookingValues.selectedFromCity,
    // selectedDestinationCity: action.bookingValues.selectedFromCity,
    // selectedDate: action.bookingValues.selectedDate,
    // selectedPassengers: action.bookingValues.selectedPassengers,
  })),
  on(BookingValuesActions.setSelectedWay, (state, action) => ({
    ...state,
    selectedWay: action.selectedWay,
  })),
  on(BookingValuesActions.setSelectedFromCity, (state, action) => ({
    ...state,
    selectedFromCity: action.selectedFromCity,
  })),
  on(BookingValuesActions.setSelectedDestinationCity, (state, action) => ({
    ...state,
    selectedDestinationCity: action.selectedDestinationCity,
  })),
);
