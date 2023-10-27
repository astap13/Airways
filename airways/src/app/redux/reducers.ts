/* eslint-disable @typescript-eslint/no-use-before-define */
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

function getNextValidDate(currentDate: NgbDate): NgbDate | null {
  const nextDate: NgbDate = {
    year: currentDate.year,
    month: currentDate.month,
    day: currentDate.day + 1,
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

  if (nextDate.month > 12) {
    nextDate.month = 1;
    nextDate.year++;
  }

  if (nextDate.day > getDaysInMonth(nextDate.year, nextDate.month)) {
    nextDate.day = 1;
    nextDate.month++;
  }

  return isValidDate(nextDate) ? nextDate : null;
}

function getPreviousValidDate(currentDate: NgbDate): NgbDate | null {
  const previousDate: NgbDate = {
    year: currentDate.year,
    month: currentDate.month,
    day: currentDate.day - 1,
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

  if (previousDate.month < 1) {
    previousDate.month = 12;
    previousDate.year--;
  }

  if (previousDate.day < 1) {
    previousDate.month--;
    if (previousDate.month < 1) {
      previousDate.month = 12;
      previousDate.year--;
    }
    previousDate.day = getDaysInMonth(previousDate.year, previousDate.month);
  }

  return isValidDate(previousDate) ? previousDate : null;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
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
    adult: [
      {
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: null,
      },
    ],
    child: [],
    infant: [],
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
  on(BookingValuesActions.setSelectedpassenger, (state, action) => ({
    ...state,
    selectedPassengers: action.selectedPassenger,
  })),
  on(BookingValuesActions.increaseSelectedAdultPassengers, (state) => {
    const currentAdultPassengers = state.selectedPassengers.adult;
    const newAdultPassenger = {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null,
    };
    return {
      ...state,
      selectedPassengers: {
        ...state.selectedPassengers,
        adult: [...currentAdultPassengers, newAdultPassenger],
      },
    };
  }),
  on(BookingValuesActions.decreaseSelectedAdultPassengers, (state) => {
    const currentAdultPassengers = state.selectedPassengers.adult;
    if (currentAdultPassengers.length > 0) {
      const updatedAdultPassengers = currentAdultPassengers.slice(0, -1);
      return {
        ...state,
        selectedPassengers: {
          ...state.selectedPassengers,
          adult: updatedAdultPassengers,
        },
      };
    }
    return state;
  }),
  on(BookingValuesActions.increaseSelectedChildPassengers, (state) => {
    const currentChildPassengers = state.selectedPassengers.child;
    const newChildPassenger = {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null,
    };
    return {
      ...state,
      selectedPassengers: {
        ...state.selectedPassengers,
        child: [...currentChildPassengers, newChildPassenger],
      },
    };
  }),
  on(BookingValuesActions.decreaseSelectedChildPassengers, (state) => {
    const currentChildPassengers = state.selectedPassengers.child;
    if (currentChildPassengers.length > 0) {
      const updatedChildPassengers = currentChildPassengers.slice(0, -1);
      return {
        ...state,
        selectedPassengers: {
          ...state.selectedPassengers,
          child: updatedChildPassengers,
        },
      };
    }
    return state;
  }),
  on(BookingValuesActions.increaseSelectedInfantPassengers, (state) => {
    const currentInfantPassengers = state.selectedPassengers.infant;
    const newInfantPassenger = {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null,
    };
    return {
      ...state,
      selectedPassengers: {
        ...state.selectedPassengers,
        infant: [...currentInfantPassengers, newInfantPassenger],
      },
    };
  }),
  on(BookingValuesActions.decreaseSelectedInfantPassengers, (state) => {
    const currentInfantPassengers = state.selectedPassengers.infant;
    if (currentInfantPassengers.length > 0) {
      const updatedInfantPassengers = currentInfantPassengers.slice(0, -1);
      return {
        ...state,
        selectedPassengers: {
          ...state.selectedPassengers,
          infant: updatedInfantPassengers,
        },
      };
    }
    return state;
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
      flight: action.selectedReturnFlight,
    },
  })),
  on(BookingValuesActions.setIsSelectedToFlight, (state, action) => ({
    ...state,
    selectedToFlight: {
      ...state.selectedToFlight,
      isSelected: action.isSelectedToFlight,
    },
  })),
  on(BookingValuesActions.setIsSelectedReturnFlight, (state, action) => ({
    ...state,
    selectedReturnFlight: {
      ...state.selectedReturnFlight,
      isSelected: action.isSelectedReturnFlight,
    },
  })),

  on(BookingValuesActions.increaseSelectedFromDate, (state) => {
    const currentFromDate: NgbDate = state.selectedDate.fromDate;
    const nextValidDate = getNextValidDate(currentFromDate);

    if (nextValidDate) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          fromDate: nextValidDate,
        },
      };
    } else {
      return state;
    }
  }),

  on(BookingValuesActions.decreaseSelectedFromDate, (state) => {
    const currentFromDate: NgbDate = state.selectedDate.fromDate;
    const previousValidDate = getPreviousValidDate(currentFromDate);

    if (previousValidDate) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          fromDate: previousValidDate,
        },
      };
    } else {
      return state;
    }
  }),
  on(BookingValuesActions.increaseSelectedToDate, (state) => {
    const currentToDate: NgbDate = state.selectedDate.toDate;
    const nextValidDate = getNextValidDate(currentToDate);

    if (nextValidDate) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          toDate: nextValidDate,
        },
      };
    } else {
      return state;
    }
  }),

  on(BookingValuesActions.decreaseSelectedToDate, (state) => {
    const currentToDate: NgbDate = state.selectedDate.toDate;
    const previousValidDate = getPreviousValidDate(currentToDate);

    if (previousValidDate) {
      return {
        ...state,
        selectedDate: {
          ...state.selectedDate,
          toDate: previousValidDate,
        },
      };
    } else {
      return state;
    }
  }),
);
