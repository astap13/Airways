import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { PassengersServiceService } from '../../services/passengers-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  userInfo$: Observable<any>;

  userInfo: any;

  constructor(private passengersService: PassengersServiceService) {
    this.request();
    this.userInfo.subscribe((el) => {
      this.userInfo = el.cart.at(-1);
    });
  }

  request() {
    this.userInfo = this.passengersService.getUserInfo();
  }
}
