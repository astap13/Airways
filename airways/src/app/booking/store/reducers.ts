/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { createReducer, on } from '@ngrx/store';

import { IBookingStateInterface } from '../models/booking.interface';
import * as BookingValuesActions from '../store/actions';

export const initialState: IBookingStateInterface = {
  selectedWay: false,
  selectedFromCity: 'New Yourk',
  selectedDestinationCity: 'Moscow',
  selectedDate: {
    fromDate: {
      year: 0,
      month: 0,
      day: 0,
      equals: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      before: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      after: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
    },
    toDate: {
      year: 0,
      month: 0,
      day: 0,
      equals: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      before: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      after: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
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
  on(BookingValuesActions.setSelectedFromDate, (state, action) => ({
    ...state,
    selectedDate: {
      ...state.selectedDate,
      fromDate: action.selectedFromDate,
    },
  })),
  on(BookingValuesActions.setSelectedToDate, (state, action) => ({
    ...state,
    selectedDate: {
      ...state.selectedDate,
      toDate: action.selectedToDate,
    },
  })),
  on(BookingValuesActions.setSelectedPassanger, (state, action) => ({
    ...state,
    selectedPassengers: action.selectedPassanger,
  })),
  on(BookingValuesActions.setSelectedAdultPassanger, (state, action) => ({
    ...state,
    selectedPassengers: {
      ...state.selectedPassengers,
      adult: action.selectedAdultPassanger,
    },
  })),
  on(BookingValuesActions.increaseSelectedAdultPassengers, (state) => ({
    ...state,
    selectedPassengers: {
      ...state.selectedPassengers,
      adult: state.selectedPassengers.adult + 1,
    },
  })),
  on(BookingValuesActions.decreaseSelectedAdultPassengers, (state) => ({
    ...state,
    selectedPassengers: {
      ...state.selectedPassengers,
      adult: state.selectedPassengers.adult - 1,
    },
  })),
  on(BookingValuesActions.increaseSelectedChildPassengers, (state) => ({
    ...state,
    selectedPassengers: {
      ...state.selectedPassengers,
      child: state.selectedPassengers.child + 1,
    },
  })),
  on(BookingValuesActions.decreaseSelectedChildPassengers, (state) => ({
    ...state,
    selectedPassengers: {
      ...state.selectedPassengers,
      child: state.selectedPassengers.child - 1,
    },
  })),
  on(BookingValuesActions.increaseSelectedInfantPassengers, (state) => ({
    ...state,
    selectedPassengers: {
      ...state.selectedPassengers,
      infant: state.selectedPassengers.infant + 1,
    },
  })),
  on(BookingValuesActions.decreaseSelectedInfantPassengers, (state) => ({
    ...state,
    selectedPassengers: {
      ...state.selectedPassengers,
      infant: state.selectedPassengers.infant - 1,
    },
  })),
  on(BookingValuesActions.decreaseSelectedFromDate, (state) => {
    const currentFromDate: NgbDate = state.selectedDate.fromDate;

    const previousDay: NgbDate = {
      year: currentFromDate.year,
      month: currentFromDate.month,
      day: currentFromDate.day - 1,
      equals: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      before: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      after: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
    };

    return {
      ...state,
      selectedDate: {
        ...state.selectedDate,
        fromDate: previousDay,
      },
    };
  }),
  on(BookingValuesActions.increaseSelectedFromDate, (state) => {
    const currentFromDate: NgbDate = state.selectedDate.fromDate;

    const previousDay: NgbDate = {
      year: currentFromDate.year,
      month: currentFromDate.month,
      day: currentFromDate.day + 1,
      equals: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      before: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      after: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
    };

    return {
      ...state,
      selectedDate: {
        ...state.selectedDate,
        fromDate: previousDay,
      },
    };
  }),
  on(BookingValuesActions.decreaseSelectedToDate, (state) => {
    const currentToDate: NgbDate = state.selectedDate.toDate;

    const previousDay: NgbDate = {
      year: currentToDate.year,
      month: currentToDate.month,
      day: currentToDate.day - 1,
      equals: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      before: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      after: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
    };

    return {
      ...state,
      selectedDate: {
        ...state.selectedDate,
        toDate: previousDay,
      },
    };
  }),
  on(BookingValuesActions.increaseSelectedToDate, (state) => {
    const currentToDate: NgbDate = state.selectedDate.toDate;

    const previousDay: NgbDate = {
      year: currentToDate.year,
      month: currentToDate.month,
      day: currentToDate.day + 1,
      equals: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      before: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      after: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
    };

    return {
      ...state,
      selectedDate: {
        ...state.selectedDate,
        toDate: previousDay,
      },
    };
  }),
);
