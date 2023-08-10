import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import { distinctUntilChanged, Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { IBookingStateInterface } from '../../models/booking.interface';
import {
  decreaseSelectedFromDate,
  decreaseSelectedToDate,
  increaseSelectedFromDate,
  increaseSelectedToDate,
} from '../../store/actions';
import {
  selectedBookingValues,
  selectedFromDate,
  selectedToDate,
  selectedWaySelector,
} from '../../store/selectors';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  selectedFlight$: Observable<IBookingStateInterface>;

  selectedWay$: Observable<boolean>;

  selectedFromDate$: Observable<NgbDate>;

  selectedToDate$: Observable<NgbDate>;

  flightsRequestFrom: any = [];

  flightsRequestTo: any = [];

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedFlight$ = this.store.pipe(select(selectedBookingValues));
    this.selectedWay$ = this.store.pipe(select(selectedWaySelector));
    this.selectedFromDate$ = this.store.pipe(select(selectedFromDate), distinctUntilChanged());
    this.selectedToDate$ = this.store.pipe(select(selectedToDate), distinctUntilChanged());
  }

  async flightRequestFrom(flightData: IBookingStateInterface) {
    this.flightsRequestFrom = [];
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

      this.flightsRequestFrom = [...this.flightsRequestFrom, requestBody];
    }
  }

  async flightRequestTo(flightData: IBookingStateInterface) {
    this.flightsRequestTo = [];
    for (let i = -2; i <= 2; i++) {
      const date: NgbDateStruct = flightData.selectedDate.toDate;

      const day = (date.day + i).toString().padStart(2, '0');
      const month = date.month.toString().padStart(2, '0');
      const year = date.year;

      const formattedDate = `${day}-${month}-${year}`;
      const requestBody = {
        from: flightData.selectedFromCity,
        to: flightData.selectedDestinationCity,
        date: formattedDate,
      };

      this.flightsRequestTo = [...this.flightsRequestTo, requestBody];
    }
  }

  ngOnInit(): void {
    this.selectedFlight$
      .pipe(
        distinctUntilChanged((prev, current) => {
          return (
            prev.selectedDate.fromDate === current.selectedDate.fromDate &&
            prev.selectedFromCity === current.selectedFromCity
          );
        }),
      )
      .subscribe((flightData) => {
        this.flightRequestFrom(flightData);
      });

    this.selectedFlight$
      .pipe(
        distinctUntilChanged((prev, current) => {
          return (
            prev.selectedDate.toDate === current.selectedDate.toDate &&
            prev.selectedDestinationCity === current.selectedDestinationCity
          );
        }),
      )
      .subscribe((flightData) => {
        this.flightRequestTo(flightData);
      });
  }

  increaseFrom() {
    this.store.dispatch(increaseSelectedFromDate());
  }

  decreaseFrom() {
    this.store.dispatch(decreaseSelectedFromDate());
  }

  increaseTo() {
    this.store.dispatch(increaseSelectedToDate());
  }

  decreaseTo() {
    this.store.dispatch(decreaseSelectedToDate());
  }

  selectToFlight() {
    console.log('Selected to Flight!');
    //TODO сделать добавление выбранного рейса вылета в стейт
  }

  selectReturnFlight() {
    console.log('Selected return Flight!');
    //TODO сделать добавление выбранного рейса возврата в стейт
  }

  // TODO добавить проверку кновки далее в зависимости от состояний стейта
}
