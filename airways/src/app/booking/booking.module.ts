import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BookingComponent } from './booking.component';

@NgModule({
  declarations: [BookingComponent],
  imports: [CommonModule],
  exports: [BookingComponent],
})
export class BookingModule {}
