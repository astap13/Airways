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

import { BookingComponent } from './booking.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [BookingComponent, MainComponent, SearchFormComponent, PassengersComponent],
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
  ],
  exports: [BookingComponent, MainComponent],
})
export class BookingModule {}
