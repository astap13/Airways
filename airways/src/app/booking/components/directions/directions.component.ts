import { Component, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject,
} from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import * as bookingActions from '../../store/actions';
import { selectedFromCitySelector } from '../../store/selectors';

export interface ICity {
  name: string;
  code?: string;
  airport?: string;
  country?: string;
}

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent {
  cities: ICity[] = [
    { name: 'New York', code: 'NY', airport: 'JFK', country: 'United States' },
    { name: 'Rome', code: 'RM', airport: 'FCO', country: 'Italy' },
    { name: 'London', code: 'LDN', airport: 'LHR', country: 'United Kingdom' },
    { name: 'Istanbul', code: 'IST', airport: 'IST', country: 'Turkey' },
    { name: 'Paris', code: 'PRS', airport: 'CDG', country: 'France' },
    { name: 'Tokyo', code: 'TKY', airport: 'HND', country: 'Japan' },
    { name: 'Sydney', code: 'SYD', airport: 'SYD', country: 'Australia' },
    { name: 'Dubai', code: 'DXB', airport: 'DXB', country: 'United Arab Emirates' },
    { name: 'Moscow', code: 'MOW', airport: 'SVO', country: 'Russia' },
    { name: 'Berlin', code: 'BER', airport: 'TXL', country: 'Germany' },
    { name: 'Madrid', code: 'MAD', airport: 'MAD', country: 'Spain' },
    { name: 'Toronto', code: 'TOR', airport: 'YYZ', country: 'Canada' },
    { name: 'Beijing', code: 'BJS', airport: 'PEK', country: 'China' },
    { name: 'Cairo', code: 'CAI', airport: 'CAI', country: 'Egypt' },
    { name: 'Mumbai', code: 'BOM', airport: 'BOM', country: 'India' },
    { name: 'Rio de Janeiro', code: 'RIO', airport: 'GIG', country: 'Brazil' },
    { name: 'Amsterdam', code: 'AMS', airport: 'AMS', country: 'Netherlands' },
    { name: 'Seoul', code: 'SEL', airport: 'ICN', country: 'South Korea' },
    { name: 'Mexico City', code: 'MEX', airport: 'MEX', country: 'Mexico' },
    { name: 'Bangkok', code: 'BKK', airport: 'BKK', country: 'Thailand' },
  ]; //эти города возвращает бек, когда будет готов

  selectedFromCity$: Observable<string>;

  seceltedDestinationCity$: Observable<string>;

  fromModel: ICity | undefined;

  toModel: ICity | undefined;

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedFromCity$ = this.store.pipe(select(selectedFromCitySelector));
    this.seceltedDestinationCity$ = this.store.pipe(select(selectedFromCitySelector));
  }

  submit() {
    console.log('this.submit');
  }

  formatCityResult = (value: ICity) => {
    return `${value.name} ${value.airport} ${value.country}`;
  };

  @ViewChild('fromInstance', { static: true }) fromInstance!: NgbTypeahead;

  @ViewChild('toInstance', { static: true }) toInstance!: NgbTypeahead;

  fromFocus$ = new Subject<string>();

  fromClick$ = new Subject<string>();

  toFocus$ = new Subject<string>();

  toClick$ = new Subject<string>();

  fromSearch: OperatorFunction<string, readonly ICity[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.fromClick$.pipe(
      filter(() => !this.fromInstance.isPopupOpen()),
    );
    const inputFocus$ = this.fromFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      filter((term) => term !== ''),
      map((term) =>
        this.cities.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1),
      ),
      map((result) => {
        if (result.length === 0) {
          return [{ name: 'No matching cities found', code: '', airport: '', country: '' }];
        } else {
          return result;
        }
      }),
    );
  };

  toSearch: OperatorFunction<string, readonly ICity[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.toClick$.pipe(filter(() => !this.toInstance.isPopupOpen()));
    const inputFocus$ = this.toFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      filter((term) => term !== ''),
      map((term) =>
        this.cities.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1),
      ),
      map((result) => {
        if (result.length === 0) {
          return [{ name: 'No matching cities found', code: '', airport: '', country: '' }];
        } else {
          return result;
        }
      }),
    );
  };

  onFromCitySelected(city: ICity) {
    const selectedCode = city.code || 'MAD';
    this.store.dispatch(bookingActions.setSelectedFromCity({ selectedFromCity: selectedCode }));
  }

  onDestinationCitySelected(city: ICity) {
    const selectedCode = city.code || 'MAD';
    this.store.dispatch(
      bookingActions.setSelectedDestinationCity({ selectedDestinationCity: selectedCode }),
    );
  }

  switchDirection() {
    const from = this.fromModel;
    const to = this.toModel;
    this.toModel = from;
    this.fromModel = to;
    if (this.fromInstance && this.toInstance) {
      this.fromInstance.writeValue(this.fromModel ? this.formatCityResult(this.fromModel) : '');
      this.toInstance.writeValue(this.toModel ? this.formatCityResult(this.toModel) : '');
    }
  }
}
