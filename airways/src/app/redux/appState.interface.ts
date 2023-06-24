import { IBookingStateInterface } from '../booking/models/booking.interface';
import { IHeaderStateInterface } from '../core/components/header/models/header.interface';

export interface IAppStateInterface {
  header: IHeaderStateInterface;
  booking: IBookingStateInterface;
}
