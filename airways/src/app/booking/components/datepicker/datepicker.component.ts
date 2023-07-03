import { Component } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbPopoverConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import * as bookingActions from '../../store/actions';
import { selectedFromDate, selectedToDate } from '../../store/selectors';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  constructor(
    private calendar: NgbCalendar,
    private store: Store<IAppStateInterface>,
    public formatter: NgbDateParserFormatter,
    config: NgbPopoverConfig,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.selectedFromDate$ = this.store.pipe(select(selectedFromDate));
    this.selectedToDate$ = this.store.pipe(select(selectedToDate));
    config.autoClose = 'outside';
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;

  toDate: NgbDate | null;

  selectedFromDate$: Observable<NgbDate>;

  selectedToDate$: Observable<NgbDate>;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.store.dispatch(bookingActions.setSelectedFromDate({ selectedFromDate: this.fromDate! }));
    this.store.dispatch(bookingActions.setSelectedToDate({ selectedToDate: this.toDate! }));
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
    const selectedDate =
      parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : null;

    if (selectedDate && !selectedDate.equals(this.fromDate)) {
      this.store.dispatch(bookingActions.setSelectedFromDate({ selectedFromDate: selectedDate }));
    }

    return selectedDate;
  }

  updateDates(fromValue: string | null, toValue: string | null) {
    if (fromValue !== null) {
      this.fromDate = this.validateInput(this.fromDate, fromValue);
    }
    if (toValue !== null) {
      this.toDate = this.validateInput(this.toDate, toValue);
    }
  }

  test() {
    console.log(this.fromDate);
    console.log(this.toDate);
  }
}
