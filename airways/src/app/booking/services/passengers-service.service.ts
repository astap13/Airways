import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IPassanger } from 'src/app/redux/booking.interface';

interface Passenger {
  ageGroup: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  _id: string;
}

export interface CartItem {
  flightId?: string | null;
  passengers?: Passenger[];
  _id?: string;
}

export interface UserData {
  _id: string;
  uid: string;
  cart: CartItem[];
  __v: number;
}

export interface FlightInfo {
  time: {
    from: string;
    to: string;
  };
  _id: string;
  from: string;
  to: string;
  date: string;
  seats: number;
  freeSeats: number;
  price: number;
  flightNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class PassengersServiceService {
  constructor(public http: HttpClient) {}

  userInfo: any;

  //переписать на rxjs

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

  getUserInfo(): Observable<UserData> {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `https://airways-api-ckd3.onrender.com/user/${user.uid}`;
    return this.http.get<UserData>(url);
  }

  getFlightInfo(fligthNumber): Observable<FlightInfo> {
    const url = `https://airways-api-ckd3.onrender.com/flights/searchByFlightNumber/${fligthNumber}`;
    return this.http.get<FlightInfo>(url);
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
