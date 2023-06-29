import { CommonModule, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbPopoverModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DirectionsComponent } from './components/directions/directions.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { RadioComponent } from './components/radio/radio.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MainComponent } from './pages/main/main.component';
import { reducer } from './store/reducers';

@NgModule({
  declarations: [
    BookingComponent,
    MainComponent,
    SearchFormComponent,
    PassengersComponent,
    RadioComponent,
    DirectionsComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    JsonPipe,
    NgbDatepickerModule,
    NgbPopoverModule,
    NgbCollapseModule,
    BookingRoutingModule,
    StoreModule.forFeature('booking', reducer),
  ],
  exports: [BookingComponent, MainComponent],
})
export class BookingModule {}
