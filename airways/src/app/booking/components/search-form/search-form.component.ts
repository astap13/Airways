import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbPopoverConfig,
  NgbTypeahead,
} from '@ng-bootstrap/ng-bootstrap';

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

interface ICity {
  name: string;
  code?: string;
  airport?: string;
  country?: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    config: NgbPopoverConfig,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    config.autoClose = 'outside';
  }

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
  ];

  fromModel: ICity | undefined;

  toModel: ICity | undefined;

  searchFormGroup!: FormGroup;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;

  toDate: NgbDate | null;

  isCollapsed = true;

  ngOnInit() {
    this.searchFormGroup = new FormGroup({
      selectedWay: new FormControl(),
    });
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
