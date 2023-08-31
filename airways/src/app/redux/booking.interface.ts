import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface IBookingStateInterface {
  selectedWay: boolean;
  selectedFromCity: string;
  selectedDestinationCity: string;
  selectedDate: {
    fromDate: NgbDate;
    toDate: NgbDate;
  };
  selectedPassengers: {
    adult: number;
    child: number;
    infant: number;
  };
  selectedToFlight: {
    flight: any;
    isSelected: boolean;
  };
  selectedReturnFlight: {
    flight: any;
    isSelected: boolean;
  };
}

export interface IFlight {
  _id?: {
    $oid: string;
  };
  from?: string;
  to?: string;
  date?: string;
  seats?: number;
  freeSeats?: number;
  price?: number;
  flightNumber?: string;
  time?: {
    from?: string;
    to?: string;
  };
}
