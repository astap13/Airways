import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import {
  CartItem,
  FlightInfo,
  PassengersServiceService,
  UserData,
} from '../../services/passengers-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  userInfo$: Observable<UserData>;

  userInfo: CartItem;

  flightInfo: FlightInfo;

  totalPrice: Number = 0;

  constructor(private passengersService: PassengersServiceService) {}

  ngOnInit() {
    this.userInfo$ = this.passengersService.getUserInfo();
    this.userInfo$.subscribe((user: UserData) => {
      this.userInfo = user.cart.at(-1);
      this.requestFlightInfo();

      // this.countTotalPrice();
    });
  }

  private requestFlightInfo() {
    if (this.userInfo) {
      this.passengersService.getFlightInfo(this.userInfo.flightId).subscribe((flightInfo) => {
        this.flightInfo = flightInfo;
        this.countTotalPrice();
      });
    }
  }

  countTotalPrice() {
    this.totalPrice = this.flightInfo.price * this.userInfo.passengers.length;
  }
}
