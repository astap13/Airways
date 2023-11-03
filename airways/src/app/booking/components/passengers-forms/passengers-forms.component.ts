import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';
import { IPassanger } from 'src/app/redux/booking.interface';

import { selectedPassengers, selectedToFlight } from '../../../redux/selectors';
import { PassengersServiceService } from '../../services/passengers-service.service';

@Component({
  selector: 'app-passengers-forms',
  templateUrl: './passengers-forms.component.html',
  styleUrls: ['./passengers-forms.component.scss'],
})
export class PassengersFormsComponent {
  selectedPassengers$: Observable<any>;

  passengerForms: FormGroup[] = [];

  passengers: IPassanger[] = [];

  flight$: any;

  constructor(
    private store: Store<IAppStateInterface>,
    private fb: FormBuilder,
    private passengersService: PassengersServiceService,
  ) {
    this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));
    this.flight$ = this.store.pipe(select(selectedToFlight));
    this.selectedPassengers$.subscribe((item) => {
      const allPassengers = [...item.adult, ...item.child, ...item.infant];
      this.passengerForms = allPassengers.map((passenger) =>
        this.createPassengerFormGroup(passenger),
      );
      this.passengers.length = 0;
      this.passengers.push(...allPassengers);
    });
    console.log(this.passengers);
    this.flight$.subscribe((el) => {
      console.log(el);
    });
  }

  createPassengerFormGroup(passenger: any): FormGroup {
    return this.fb.group({
      firstName: [passenger.firstName, Validators.required],
      lastName: [passenger.lastName, Validators.required],
      sex: [passenger.gender, Validators.required],
      dateOfBirth: [passenger.birthDate, Validators.required],
    });
  }

  savePassengers() {}
}
