/* eslint-disable @typescript-eslint/no-loop-func */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { IBookingStateInterface } from '../../models/booking.interface';
import { increaseSelectedFromDate } from '../../store/actions';
import { selectedBookingValues } from '../../store/selectors';

export interface IActuallyFlights {
  date: Date;
  day: string;
  price: number;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  selectedFlight$: Observable<IBookingStateInterface>;

  flightsRequest: any = [];

  constructor(private store: Store<IAppStateInterface>, private http: HttpClient) {
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
    // this.actualyFlights.forEach((el) => {
    //   const newDate = new Date(el.date);
    //   newDate.setDate(newDate.getDate() - 1);
    //   el.date = newDate;
    // });
  }
}
