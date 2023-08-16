import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { createAction, props } from '@ngrx/store';

interface IPassangers {
  adult: number;
  child: number;
  infant: number;
}

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

export const setSelectedFromDate = createAction(
  '[BookingValues] Set selected From Date',
  props<{ selectedFromDate: NgbDate }>(),
);

export const setSelectedToDate = createAction(
  '[BookingValues] Set selected To Date',
  props<{ selectedToDate: NgbDate }>(),
);

export const setSelectedPassanger = createAction(
  '[BookingValues] Set selected Passangers',
  props<{ selectedPassanger: IPassangers }>(),
);

export const setSelectedAdultPassanger = createAction(
  '[BookingValues] Set selected Adult Passangers',
  props<{ selectedAdultPassanger: number }>(),
);

export const setSelectedChildPassanger = createAction(
  '[BookingValues] Set selected Child Passangers',
  props<{ selectedChildPassanger: number }>(),
);

export const setSelectedInfantPassanger = createAction(
  '[BookingValues] Set selected Infant Passangers',
  props<{ selectedInfantPassanger: number }>(),
);

export const increaseSelectedAdultPassengers = createAction(
  '[BookingValues] Increase Selected Adult Passengers',
);

export const decreaseSelectedAdultPassengers = createAction(
  '[BookingValues] Decrease Selected Adult Passengers',
);

export const increaseSelectedChildPassengers = createAction(
  '[BookingValues] Increase Selected Child Passengers',
);

export const decreaseSelectedChildPassengers = createAction(
  '[BookingValues] Decrease Selected Child Passengers',
);

export const increaseSelectedInfantPassengers = createAction(
  '[BookingValues] Increase Selected Infant Passengers',
);

export const decreaseSelectedInfantPassengers = createAction(
  '[BookingValues] Decrease Selected Infant Passengers',
);

export const decreaseSelectedFromDate = createAction(
  '[BookingValues] Decrease   Selected From Date',
);

export const increaseSelectedFromDate = createAction(
  '[BookingValues] Increase Selected Selected From Date',
);

export const decreaseSelectedToDate = createAction(
  '[BookingValues]  Decrease   Selected  To  Date',
);

export const increaseSelectedToDate = createAction(
  '[BookingValues] Increase Selected Selected To Date',
);

export const setSelectedToFlight = createAction(
  '[BookingValues] Set selected To Flight',
  props<{ selectedToFlight: any }>(),
);

export const setSelectedReturnFlight = createAction(
  '[BookingValues] Set selected Return Flight',
  props<{ selectedReturnFlight: any }>(),
);
