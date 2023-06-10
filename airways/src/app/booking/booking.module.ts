import { CommonModule, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbPopoverModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

import { BookingComponent } from './booking.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [BookingComponent, MainComponent, SearchFormComponent],
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
  ],
  exports: [BookingComponent, MainComponent],
})
export class BookingModule {}
