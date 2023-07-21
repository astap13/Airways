import { animate, style, transition, trigger } from '@angular/animations';
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
  animations: [
    // Добавьте анимацию в секцию "animations"
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [animate('500ms ease-out', style({ transform: 'translateX(100%)' }))]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  selectedFlight$: Observable<IBookingStateInterface>;

  actualyFlights: IActuallyFlights[] = [];

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedFlight$ = this.store.pipe(select(selectedBookingValues));
  }

  ngOnInit(): void {
    this.selectedFlight$.subscribe((flightData: IBookingStateInterface) => {
      this.processFlightsData(flightData);
      this.playCarouselAnimation();
    });
  }

  playCarouselAnimation(): void {
    // Просто вызываем анимацию на каждом элементе массива actualyFlights
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
