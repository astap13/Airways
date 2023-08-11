import { IHeaderStateInterface } from '../core/components/header/models/header.interface';
import { IBookingStateInterface } from '../redux/booking.interface';

export interface IAppStateInterface {
  header: IHeaderStateInterface;
  booking: IBookingStateInterface;
}
