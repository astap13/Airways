import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';
import { selectedPassengers } from 'src/app/redux/selectors';

import { PassengersServiceService } from '../../services/passengers-service.service';

@Component({
  selector: 'app-passengers-forms',
  templateUrl: './passengers-forms.component.html',
  styleUrls: ['./passengers-forms.component.scss'],
})
export class PassengersFormsComponent {
  profileForm = this.fb.group({
    passengers: this.fb.array([this.createPassengerFormGroup()]),
  });

  selectedPassengers$: Observable<any>;

  countOfPassengers: number;

  constructor(
    private store: Store<IAppStateInterface>,
    private fb: FormBuilder,
    private passengersService: PassengersServiceService,
  ) {
    this.selectedPassengers$ = this.store.pipe(select(selectedPassengers));
    this.selectedPassengers$.subscribe((el) => {
      let array = [...el.adult, ...el.child, ...el.infant];
      for (let i = 0; i < array.length - 1; i++) {
        this.addPassenger();
      }
    });
  }

  createPassengerFormGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['male', Validators.required],
      birthDate: ['', Validators.required],
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
      this.passengersService.request('test', this.profileForm.value.passengers);
    }
  }
}
