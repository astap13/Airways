import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-passenger-form-card',
  templateUrl: './passenger-form-card.component.html',
  styleUrls: ['./passenger-form-card.component.scss'],
})
export class PassengerFormCardComponent implements OnInit {
  passengerControl!: FormGroup;

  @Input()
  passenger!: any;

  ngOnInit() {
    this.passengerControl = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      sex: new FormControl(''),
      dateOfBirth: new FormControl(''),
    });
    this.passengerControl.valueChanges.subscribe((value) => console.log(value));
    this.passengerControl.statusChanges.subscribe((status) => console.log(status));
  }
}
