import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';
import { selectedPassengers } from 'src/app/redux/selectors';

import { IPassengers } from '../../pages/flight/flight.component';

@Component({
  selector: 'app-passengers-forms',
  templateUrl: './passengers-forms.component.html',
  styleUrls: ['./passengers-forms.component.scss'],
})
export class PassengersFormsComponent implements OnInit {
  selectedPassengers$: Observable<IPassengers>;

  passengers: any = [];

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));
    this.selectedPassengers$.subscribe((item) => {
      this.passengers = item;
    });
  }

  ngOnInit() {
    console.log(this.passengers);
  }
}
