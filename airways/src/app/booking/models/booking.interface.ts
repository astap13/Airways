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
}
