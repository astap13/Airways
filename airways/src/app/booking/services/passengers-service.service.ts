import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IPassanger } from 'src/app/redux/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class PassengersServiceService {
  constructor(public http: HttpClient) {}

  async request(flightID: string, date: IPassanger) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userData = user;
    const url = `https://airways-api-ckd3.onrender.com/user/${userData.uid}/cart`;
    const requestData = { flightID, date };
    try {
      await this.http.post(url, requestData).toPromise();
    } catch (error) {}
  }

  calculateAgeGroup(birthDate: any): string {
    const now = new Date();
    const birth = new Date(birthDate);
    const age = now.getFullYear() - birth.getFullYear();
    if (age <= 2) {
      return 'Infant';
    } else if (age <= 12) {
      return 'Child';
    } else {
      return 'Adult';
    }
  }
}
