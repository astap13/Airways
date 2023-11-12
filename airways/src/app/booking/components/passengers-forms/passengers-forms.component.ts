import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { PassengersServiceService } from '../../services/passengers-service.service';

@Component({
  selector: 'app-passengers-forms',
  templateUrl: './passengers-forms.component.html',
  styleUrls: ['./passengers-forms.component.scss'],
})
export class PassengersFormsComponent {
  selectedPassengers$: Observable<any>;

  flight$: any;

  profileForm = this.fb.group({
    passengers: this.fb.array([this.createPassengerFormGroup()]),
  });

  constructor(
    private store: Store<IAppStateInterface>,
    private fb: FormBuilder,
    private passengersService: PassengersServiceService,
  ) {}

  createPassengerFormGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  get passengers() {
    return this.profileForm.get('passengers') as FormArray;
  }

  addPassenger() {
    this.passengers.push(this.createPassengerFormGroup());
  }

  removePassenger(index: number) {
    this.passengers.removeAt(index);
  }

  savePassengers() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value.passengers);
    }
  }
}
