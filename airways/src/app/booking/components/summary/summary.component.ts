import { Component } from '@angular/core';

import { PassengersServiceService } from '../../services/passengers-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  userInfo: any;

  constructor(private passengersService: PassengersServiceService) {}

  async request() {
    await this.passengersService.getUserInfo();
    this.userInfo = this.passengersService.userInfo;
    console.log(this.userInfo);
  }
}
