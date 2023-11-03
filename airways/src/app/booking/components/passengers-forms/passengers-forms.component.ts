import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { selectedPassengers } from '../../../redux/selectors'; // Импортируйте селекторы из вашего приложения
import { PassengersServiceService } from '../../services/passengers-service.service';

@Component({
  selector: 'app-passengers-forms',
  templateUrl: './passengers-forms.component.html',
  styleUrls: ['./passengers-forms.component.scss'],
})
export class PassengersFormsComponent {
  selectedPassengers$: Observable<any>;

  passengerForms: FormGroup[] = [];

  constructor(
    private store: Store<IAppStateInterface>,
    private fb: FormBuilder,
    private passengersService: PassengersServiceService,
  ) {
    this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));
    this.selectedPassengers$.subscribe((item) => {
      const allPassengers = [...item.adult, ...item.child, ...item.infant];
      this.passengerForms = allPassengers.map((passenger) =>
        this.createPassengerFormGroup(passenger),
      );
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
}
