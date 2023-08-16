/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { createReducer, on } from '@ngrx/store';

import * as BookingValuesActions from '../redux/actions';
import { IBookingStateInterface } from './booking.interface';

function isValidDate(date: NgbDate): boolean {
  try {
    new Date(date.year, date.month - 1, date.day);
    return true;
  } catch (error) {
    return false;
  }
}

export const initialState: IBookingStateInterface = {
  selectedWay: false,
  selectedFromCity: 'Warszaw',
  selectedDestinationCity: 'Rome',
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
  selectedToFlight: {
    flight: null,
    isSelected: false,
  },
  selectedReturnFlight: {
    flight: null,
    isSelected: false,
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

    if (isValidDate(previousDay)) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          fromDate: previousDay,
        },
      };
    } else {
      return state; // Не делайте изменений, если дата недопустима
    }
  }),

  on(BookingValuesActions.increaseSelectedFromDate, (state) => {
    const currentFromDate: NgbDate = state.selectedDate.fromDate;

    const nextDay: NgbDate = {
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

    if (isValidDate(nextDay)) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          fromDate: nextDay,
        },
      };
    } else {
      return state; // Не делайте изменений, если дата недопустима
    }
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

    if (isValidDate(previousDay)) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          toDate: previousDay,
        },
      };
    } else {
      return state; // Не делайте изменений, если дата недопустима
    }
  }),

  on(BookingValuesActions.increaseSelectedToDate, (state) => {
    const currentToDate: NgbDate = state.selectedDate.toDate;

    const nextDay: NgbDate = {
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

    if (isValidDate(nextDay)) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          toDate: nextDay,
        },
      };
    } else {
      return state; // Не делайте изменений, если дата недопустима
    }
  }),
  on(BookingValuesActions.setSelectedToFlight, (state, action) => ({
    ...state,
    selectedToFlight: {
      ...state.selectedToFlight,
      flight: action.selectedToFlight,
    },
  })),
  on(BookingValuesActions.setSelectedReturnFlight, (state, action) => ({
    ...state,
    selectedReturnFlight: {
      ...state.selectedReturnFlight,
      flight: action.selectedReturnFlight.flight,
    },
  })),
);
