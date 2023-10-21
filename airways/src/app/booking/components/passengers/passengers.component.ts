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

  sumPassengers: number = 1;

  maxPassengers: number = 5;

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedAdults$ = this.store.pipe(select(selectedAdultPassengers));
    this.selectedChild$ = this.store.pipe(select(selectedChildPassengers));
    this.selectedInfant$ = this.store.pipe(select(selectedInfantPassengers));
  }

  increaseAdults() {
    if (this.sumPassengers < this.maxPassengers) {
      this.store.dispatch(increaseSelectedAdultPassengers());
      this.sumPassengers++;
    }
  }

  decreaseAdults() {
    if (this.sumPassengers > 1) {
      this.store.dispatch(decreaseSelectedAdultPassengers());
      this.sumPassengers--;
    }
  }

  increaseChild() {
    if (this.sumPassengers < this.maxPassengers) {
      this.store.dispatch(increaseSelectedChildPassengers());
      this.sumPassengers++;
    }
  }

  decreaseChild() {
    if (this.sumPassengers > 1) {
      this.store.dispatch(decreaseSelectedChildPassengers());
      this.sumPassengers--;
    }
  }

  increaseInfant() {
    if (this.sumPassengers < this.maxPassengers) {
      this.store.dispatch(increaseSelectedInfantPassengers());
      this.sumPassengers++;
    }
  }

  decreaseInfant() {
    if (this.sumPassengers > 1) {
      this.store.dispatch(decreaseSelectedInfantPassengers());
      this.sumPassengers--;
    }
  }
}
