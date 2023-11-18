import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IPassanger } from 'src/app/redux/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class PassengersServiceService {
  constructor(public http: HttpClient) {}

  userInfo: any;

  async request(flightId: string, passengers: IPassanger[]) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userData = user;
    const url = `https://airways-api-ckd3.onrender.com/user/${userData.uid}/cart`;
    const updatedPassengers = passengers.map((passenger) => {
      const ageGroup = this.calculateAgeGroup(passenger.birthDate);
      return { ...passenger, ageGroup };
    });
    const requestData = { flightId, passengers: updatedPassengers };
    try {
      await this.http.post(url, requestData).toPromise();
    } catch (error) {}
  }

  getUserInfo(): Observable<Response> {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `https://airways-api-ckd3.onrender.com/user/${user.uid}`;
    return this.http.get<Response>(url);
  }

  calculateAgeGroup(birthDate: any): string {
    const now = new Date();
    const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
    const age = now.getFullYear() - birth.getFullYear();

    if (
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
    ) {
      return (age - 1).toString();
    }

    if (age <= 2) {
      return 'Infant';
    } else if (age <= 12) {
      return 'Child';
    } else {
      return 'Adult';
    }
  }
}
