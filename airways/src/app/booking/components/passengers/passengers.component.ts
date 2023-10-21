import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
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
  selectedAdults$: Observable<any>;

  selectedChild$: Observable<any>;

  selectedInfant$: Observable<any>;

  isCollapsed: boolean = false;

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedAdults$ = this.store.pipe(select(selectedAdultPassengers));
    this.selectedChild$ = this.store.pipe(select(selectedChildPassengers));
    this.selectedInfant$ = this.store.pipe(select(selectedInfantPassengers));
  }

  increaseAdults() {
    this.store.dispatch(increaseSelectedAdultPassengers());
  }

  decreaseAdults() {
    this.store.dispatch(decreaseSelectedAdultPassengers());
  }

  increaseChild() {
    this.store.dispatch(increaseSelectedChildPassengers());
  }

  decreaseChild() {
    this.store.dispatch(decreaseSelectedChildPassengers());
  }

  increaseInfant() {
    this.store.dispatch(increaseSelectedInfantPassengers());
  }

  decreaseInfant() {
    this.store.dispatch(decreaseSelectedInfantPassengers());
  }
}
