/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import { combineLatest, distinctUntilChanged, map, Observable, take } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import {
  decreaseSelectedFromDate,
  decreaseSelectedToDate,
  increaseSelectedFromDate,
  increaseSelectedToDate,
  setIsSelectedReturnFlight,
  setIsSelectedToFlight,
} from '../../../redux/actions';
import { IBookingStateInterface } from '../../../redux/booking.interface';
import {
  isSelectedReturnFlight,
  isSelectedToFlight,
  selectedBookingValues,
  selectedFromDate,
  selectedReturnFlight,
  selectedToDate,
  selectedToFlight,
  selectedWaySelector,
} from '../../../redux/selectors';

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

  selectedToFlights$: Observable<any>;

  selectedReturnFlights$: Observable<any>;

  isSelectedToFlights$: Observable<boolean>;

  isSelectedReturnFlights$: Observable<boolean>;

  isNextButtonEnabled$: Observable<boolean> | undefined;

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedFlight$ = this.store.pipe(select(selectedBookingValues));
    this.selectedWay$ = this.store.pipe(select(selectedWaySelector));
    this.selectedFromDate$ = this.store.pipe(select(selectedFromDate), distinctUntilChanged());
    this.selectedToDate$ = this.store.pipe(select(selectedToDate), distinctUntilChanged());
    this.selectedToFlights$ = this.store.pipe(select(selectedToFlight));
    this.selectedReturnFlights$ = this.store.pipe(select(selectedReturnFlight));
    this.isSelectedToFlights$ = this.store.pipe(select(isSelectedToFlight));
    this.isSelectedReturnFlights$ = this.store.pipe(select(isSelectedReturnFlight));
  }

  async flightRequestFrom(flightData: IBookingStateInterface) {
    this.flightsRequestFrom = [];
    for (let i = -2; i <= 2; i++) {
      const date: NgbDateStruct = flightData.selectedDate.fromDate;

      const day = (date.day + i).toString().padStart(2, '0');
      const month = date.month.toString().padStart(2, '0');
      const year = date.year;

      const formattedDate = `${year}-${month}-${day}`;
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

      const formattedDate = `${year}-${month}-${day}`;
      const requestBody = {
        from: flightData.selectedDestinationCity,
        to: flightData.selectedFromCity,
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

    this.isNextButtonEnabled$ = combineLatest([
      this.selectedToFlights$,
      this.selectedReturnFlights$,
      this.isSelectedToFlights$,
      this.isSelectedReturnFlights$,
      this.selectedWay$,
    ]).pipe(
      map(
        ([
          selectedToFlightsValue,
          selectedReturnFlightsValue,
          isSelectedToFlight,
          isSelectedReturnFlight,
          selectedWay,
        ]) => {
          if (selectedWay) {
            return (
              selectedToFlightsValue !== null &&
              selectedToFlightsValue !== '' &&
              selectedReturnFlightsValue !== null &&
              selectedReturnFlightsValue !== '' &&
              isSelectedToFlight &&
              isSelectedReturnFlight
            );
          } else {
            return (
              selectedToFlightsValue !== null && selectedToFlightsValue !== '' && isSelectedToFlight
            );
          }
        },
      ),
    );
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
    this.selectedToFlights$.subscribe((selectedToFlightValue) => {
      if (selectedToFlightValue !== '') {
        this.isSelectedToFlights$.pipe(take(1)).subscribe((isSelectedToFlight) => {
          this.store.dispatch(setIsSelectedToFlight({ isSelectedToFlight: !isSelectedToFlight }));
        });
      }
    });
  }

  selectReturnFlight() {
    this.selectedReturnFlights$.subscribe((selectedReturnFlightsValue) => {
      if (selectedReturnFlightsValue !== '') {
        this.isSelectedReturnFlights$.pipe(take(1)).subscribe((isSelectedReturnFlight) => {
          this.store.dispatch(
            setIsSelectedReturnFlight({ isSelectedReturnFlight: !isSelectedReturnFlight }),
          );
        });
      }
    });
  }
}
