import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassengersServiceService {
  // constructor() {}

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
