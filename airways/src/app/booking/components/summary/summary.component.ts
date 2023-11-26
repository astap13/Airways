import { Component } from '@angular/core';

import { PassengersServiceService } from '../../services/passengers-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  userInfo: any;

  flightInfo: any;

  constructor(private passengersService: PassengersServiceService) {
    this.request();
    this.userInfo.subscribe((el) => {
      this.userInfo = el.cart.at(-1);
    });
  }

  request() {
    this.userInfo = this.passengersService.getUserInfo();
    this.flightInfo = this.passengersService.getFlightInfo(this.userInfo.flightId);
    this.userInfo.subscribe((el) => console.log(el));
    this.flightInfo.subscribe((el) => console.log(el));
  }
}
