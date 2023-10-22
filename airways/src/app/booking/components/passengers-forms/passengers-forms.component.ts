import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';
import { selectedPassengers } from 'src/app/redux/selectors';

@Component({
  selector: 'app-passengers-forms',
  templateUrl: './passengers-forms.component.html',
  styleUrls: ['./passengers-forms.component.scss'],
})
export class PassengersFormsComponent implements OnInit {
  selectedPassengers$: Observable<any>;

  passengers: any = [];

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));
    this.selectedPassengers$.subscribe((item) => {
      this.passengers = [...item.adult, ...item.child, ...item.infant];
    });
  }

  ngOnInit() {
    console.log(this.passengers);
  }
}
