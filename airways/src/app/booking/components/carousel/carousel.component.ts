import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { IBookingStateInterface } from '../../models/booking.interface';
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

  actualyFlights: IActuallyFlights[] = [];

  constructor(private store: Store<IAppStateInterface>, private http: HttpClient) {
    this.selectedFlight$ = this.store.pipe(select(selectedBookingValues));
  }

  makeTestPostRequest() {
    const url = 'https://airways-api-ckd3.onrender.com/post';
    const requestBody = {
      from: 'Moscow',
      to: 'New York',
      date: '2023-08-03',
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.http.post(url, requestBody, httpOptions).subscribe(
      (response) => {
        console.log('Post Request Response:', response);
        // Do something with the response if needed
      },
      (error) => {
        console.error('Error occurred during the POST request:', error);
      },
    );
  }

  ngOnInit(): void {
    this.selectedFlight$.subscribe((flightData: IBookingStateInterface) => {
      this.processFlightsData(flightData);
      this.makeTestPostRequest();
    });
  }

  increase() {
    this.actualyFlights.forEach((el) => {
      const newDate = new Date(el.date);

      newDate.setDate(newDate.getDate() + 1);

      el.date = newDate;
    });
  }

  decrease() {
    this.actualyFlights.forEach((el) => {
      const newDate = new Date(el.date);

      newDate.setDate(newDate.getDate() - 1);

      el.date = newDate;
    });
  }

  processFlightsData(flightData: IBookingStateInterface): void {
    const fromDate = new Date(
      flightData.selectedDate.fromDate.year,
      flightData.selectedDate.fromDate.month - 1,
      flightData.selectedDate.fromDate.day,
    );

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    for (let i = -2; i <= 2; i++) {
      const newDate = new Date(fromDate);
      newDate.setDate(fromDate.getDate() + i);

      const dayIndexOffset = newDate.getDay();
      const dayOfWeek = daysOfWeek[dayIndexOffset];

      this.actualyFlights.push({
        date: newDate,
        day: dayOfWeek,
        price: 0,
      });
    }
  }
}
