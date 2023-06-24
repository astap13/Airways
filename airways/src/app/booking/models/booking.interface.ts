export interface IBookingStateInterface {
  selectedWay: boolean; // if true --> round trip
  selectedFromCity: string;
  selectedDestinationCity: string;
  selectedDate: {
    fromDate: {
      year: number;
      month: number;
      day: number;
    };
    toDate: {
      year: number;
      month: number;
      day: number;
    };
  };
  selectedPassengers: {
    adult: number;
    child: number;
    infant: number;
  };
}
