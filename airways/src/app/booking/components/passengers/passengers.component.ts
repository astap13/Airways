import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable, take } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import {
  decreaseSelectedAdultPassengers,
  decreaseSelectedChildPassengers,
  decreaseSelectedInfantPassengers,
  increaseSelectedAdultPassengers,
  increaseSelectedChildPassengers,
  increaseSelectedInfantPassengers,
} from '../../../redux/actions';
import {
  selectedAdultPassengers,
  selectedChildPassengers,
  selectedInfantPassengers,
} from '../../../redux/selectors';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  selectedAdults$: Observable<number>; // or Observable<number>

  selectedChild$: Observable<number>;

  selectedInfant$: Observable<number>;

  isCollapsed: boolean = false;

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedAdults$ = this.store.pipe(select(selectedAdultPassengers));
    this.selectedChild$ = this.store.pipe(select(selectedChildPassengers));
    this.selectedInfant$ = this.store.pipe(select(selectedInfantPassengers));
  }

  increaseAdults() {
    this.selectedAdults$.pipe(take(1)).subscribe((selectedAdults) => {
      if (selectedAdults < 4) {
        this.store.dispatch(increaseSelectedAdultPassengers());
      }
    });
  }

  decreaseAdults() {
    this.selectedAdults$.pipe(take(1)).subscribe((selectedAdults) => {
      if (selectedAdults > 1) {
        this.store.dispatch(decreaseSelectedAdultPassengers());
      }
    });
  }

  increaseChild() {
    this.selectedChild$.pipe(take(1)).subscribe((selectedChild) => {
      if (selectedChild < 4) {
        this.store.dispatch(increaseSelectedChildPassengers());
      }
    });
  }

  decreaseChild() {
    this.selectedChild$.pipe(take(1)).subscribe((selectedChild) => {
      if (selectedChild > 0) {
        this.store.dispatch(decreaseSelectedChildPassengers());
      }
    });
  }

  increaseInfant() {
    this.selectedInfant$.pipe(take(1)).subscribe((selectedInfant) => {
      if (selectedInfant < 4) {
        this.store.dispatch(increaseSelectedInfantPassengers());
      }
    });
  }

  decreaseInfant() {
    this.selectedInfant$.pipe(take(1)).subscribe((selectedInfant) => {
      if (selectedInfant > 0) {
        this.store.dispatch(decreaseSelectedInfantPassengers());
      }
    });
  }
}
