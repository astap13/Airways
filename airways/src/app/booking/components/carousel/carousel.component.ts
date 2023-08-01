/* eslint-disable @typescript-eslint/no-loop-func */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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

  postResponses: any[] = [];

  loading: boolean = true;

  Array: any;

  constructor(private store: Store<IAppStateInterface>, private http: HttpClient) {
    this.selectedFlight$ = this.store.pipe(select(selectedBookingValues));
  }

  async flightRequest() {
    this.selectedFlight$.subscribe(async (flightData) => {
      const url = 'https://airways-api-ckd3.onrender.com/post';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

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
        console.log(requestBody);

        try {
          const response = await this.http.post(url, requestBody, httpOptions).toPromise();
          console.log('Post Request Response:', response);
          this.postResponses.push(response);
        } catch (error) {
          console.error('Error occurred during the POST request:', error);
        }
      }

      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.selectedFlight$.subscribe(() => {
      this.processFlightsData();
      this.flightRequest();
    });
  }

  increase() {
    // this.actualyFlights.forEach((el) => {
    //   const newDate = new Date(el.date);
    //   newDate.setDate(newDate.getDate() + 1);
    //   el.date = newDate;
    // });
  }

  decrease() {
    // this.actualyFlights.forEach((el) => {
    //   const newDate = new Date(el.date);
    //   newDate.setDate(newDate.getDate() - 1);
    //   el.date = newDate;
    // });
  }

  processFlightsData(): void {
    // const fromDate = new Date(
    //   flightData.selectedDate.fromDate.year,
    //   flightData.selectedDate.fromDate.month - 1,
    //   flightData.selectedDate.fromDate.day,
    // );
    // const daysOfWeek = [
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    // ];
    // for (let i = -2; i <= 2; i++) {
    //   const newDate = new Date(fromDate);
    //   newDate.setDate(fromDate.getDate() + i);
    //   const dayIndexOffset = newDate.getDay();
    //   const dayOfWeek = daysOfWeek[dayIndexOffset];
    //   this.postResponses.push({
    //     date: newDate,
    //     day: dayOfWeek,
    //   });
    // }
  }
}
