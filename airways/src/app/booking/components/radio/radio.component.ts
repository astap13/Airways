import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import * as bookingActions from '../../../redux/actions';
import { selectedWaySelector } from '../../../redux/selectors';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  selectedWay$: Observable<boolean>;

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedWay$ = this.store.pipe(select(selectedWaySelector));
  }

  ngOnInit(): void {
    this.store.dispatch(bookingActions.getBookingValues());
  }

  onRadioChange(selectedWay: boolean) {
    this.store.dispatch(bookingActions.setSelectedWay({ selectedWay }));
  }
}
