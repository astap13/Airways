import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { createAction, props } from '@ngrx/store';

interface IPassengers {
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

export const setSelectedpassenger = createAction(
  '[BookingValues] Set selected Passengers',
  props<{ selectedpassenger: IPassengers }>(),
);

export const setSelectedAdultpassenger = createAction(
  '[BookingValues] Set selected Adult Passengers',
  props<{ selectedAdultpassenger: number }>(),
);

export const setSelectedChildpassenger = createAction(
  '[BookingValues] Set selected Child Passengers',
  props<{ selectedChildpassenger: number }>(),
);

export const setSelectedInfantpassenger = createAction(
  '[BookingValues] Set selected Infant Passengers',
  props<{ selectedInfantpassenger: number }>(),
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
  props<{ selectedToFlight: string }>(),
);

export const setSelectedReturnFlight = createAction(
  '[BookingValues] Set selected Return Flight',
  props<{ selectedReturnFlight: string }>(),
);

export const setIsSelectedToFlight = createAction(
  '[BookingValues] Set selected Is To Flight',
  props<{ isSelectedToFlight: any }>(),
);

export const setIsSelectedReturnFlight = createAction(
  '[BookingValues] Set selected Is Return Flight',
  props<{ isSelectedReturnFlight: any }>(),
);
