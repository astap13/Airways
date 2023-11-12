import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-form-card',
  templateUrl: './passenger-form-card.component.html',
  styleUrls: ['./passenger-form-card.component.scss'],
})
export class PassengerFormCardComponent implements OnChanges {
  @Input() passenger: any;

  passengerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      sex: [''],
      dateOfBirth: [''],
    });
  }

  // createPassengerFormGroup(passenger: any): FormGroup {
  //   return this.fb.group({
  //     firstName: [passenger.firstName, Validators.required],
  //     lastName: [passenger.lastName, Validators.required],
  //     sex: [passenger.gender, Validators.required],
  //     dateOfBirth: [passenger.birthDate, Validators.required],
  //   });
  // }

  ngOnChanges() {
    if (this.passenger) {
      this.passengerForm = this.fb.group({
        firstName: [this.passenger.firstName || '', Validators.required],
        lastName: [this.passenger.lastName || '', Validators.required],
        sex: [this.passenger.gender || '', Validators.required],
        dateOfBirth: [this.passenger.birthDate || '', Validators.required],
      });
    }
  }
}
