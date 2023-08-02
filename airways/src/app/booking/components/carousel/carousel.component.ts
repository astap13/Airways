import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { IBookingStateInterface } from '../../models/booking.interface';
import { decreaseSelectedFromDate, increaseSelectedFromDate } from '../../store/actions';
import { selectedBookingValues } from '../../store/selectors';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  selectedFlight$: Observable<IBookingStateInterface>;

  flightsRequest: any = [];

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedFlight$ = this.store.pipe(select(selectedBookingValues));
  }

  async flightRequest(flightData: IBookingStateInterface) {
    this.flightsRequest = [];
    for (let i = -2; i <= 2; i++) {
      const date: NgbDateStruct = flightData.selectedDate.fromDate;

      const day = (date.day + i).toString().padStart(2, '0');
      const month = date.month.toString().padStart(2, '0');
      const year = date.year;

      const formattedDate = `${day}-${month}-${year}`;
      const requestBody = {
        from: flightData.selectedFromCity,
        to: flightData.selectedDestinationCity,
        date: formattedDate,
      };

      this.flightsRequest.push(requestBody);
    }
  }

  ngOnInit(): void {
    this.selectedFlight$.subscribe((flightData) => {
      this.flightRequest(flightData);
    });
  }

  increase() {
    this.store.dispatch(increaseSelectedFromDate());
  }

  decrease() {
    this.store.dispatch(decreaseSelectedFromDate());
  }
}
