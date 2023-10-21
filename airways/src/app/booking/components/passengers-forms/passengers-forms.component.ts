import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppStateInterface } from 'src/app/redux/appState.interface';

@Component({
  selector: 'app-passengers-forms',
  templateUrl: './passengers-forms.component.html',
  styleUrls: ['./passengers-forms.component.scss'],
})
export class PassengersFormsComponent implements OnInit {
  // selectedPassengers$: Observable<IPassengers>;

  passengers: any = [];

  constructor(private store: Store<IAppStateInterface>) {
    // this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));
    // this.selectedPassengers$.subscribe((item) => {
    //   this.passengers = item;
    // });
  }

  ngOnInit() {
    console.log(this.passengers);
  }
}
