import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface IBookingStateInterface {
  selectedWay: string;
  selectedFromCity: string;
  selectedDestinationCity: string;
  selectedDate: {
    fromDate: NgbDate; // надо преобразовать
    toDate: NgbDate; // надо преобразовать
  };
  selectedPassengers: {
    adult: number;
    child: number;
    infant: number;
  };
}
