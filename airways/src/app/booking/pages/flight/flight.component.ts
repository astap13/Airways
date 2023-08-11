import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import {
  selectedDestinationCitySelector,
  selectedFromCitySelector,
  selectedFromDate,
  selectedPassengers,
  selectedToDate,
  selectedWaySelector,
} from '../../../redux/selectors';

interface IPassangers {
  adult: number;
  child: number;
  infant: number;
}

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {
  destinationCity$: Observable<string>;

  fromCity$: Observable<string>;

  selectedWay$: Observable<boolean>;

  fromDate$: Observable<NgbDate>;

  toDate$: Observable<NgbDate>;

  formattedFromDate: string | null | undefined;

  formattedToDate: string | null | undefined;

  selectedPassengers$: Observable<IPassangers>;

  sumPassangers: number | null | undefined;

  constructor(private store: Store<IAppStateInterface>, private datePipe: DatePipe) {
    this.destinationCity$ = this.store.pipe(select(selectedDestinationCitySelector));
    this.fromCity$ = this.store.pipe(select(selectedFromCitySelector));
    this.selectedWay$ = this.store.pipe(select(selectedWaySelector));
    this.fromDate$ = this.store.pipe(select(selectedFromDate));
    this.toDate$ = this.store.pipe(select(selectedToDate));
    this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));

    this.fromDate$.subscribe((ngbDate: NgbDate) => {
      const date: Date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
      this.formattedFromDate = this.datePipe.transform(date, 'dd MMM');
    });
    this.toDate$.subscribe((ngbDate: NgbDate) => {
      const date: Date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
      this.formattedToDate = this.datePipe.transform(date, 'dd MMM');
    });
    this.selectedPassengers$.subscribe((passangerArray: IPassangers) => {
      this.sumPassangers = passangerArray.adult + passangerArray.child + passangerArray.infant;
    });
  }

  public isCollapsed = false;
}
