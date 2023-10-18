import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { map, Observable } from 'rxjs';
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

  passengers: any[] = [];

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));
    this.selectedPassengers$
      .pipe(
        map((passengerArray: IPassengers) => {
          const filteredPassengers: string[] = [];

          Object.keys(passengerArray).forEach((key) => {
            const count = passengerArray[key];
            for (let i = 0; i < count; i++) {
              filteredPassengers.push(key);
            }
          });

          return filteredPassengers;
        }),
      )
      .subscribe((filteredPassengers: string[]) => {
        this.passengers = filteredPassengers;
      });
  }

  ngOnInit() {
    console.log(this.passengers);
  }
}
