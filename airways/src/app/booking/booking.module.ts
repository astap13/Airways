import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookingComponent } from './booking.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [BookingComponent, MainComponent, SearchFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [BookingComponent, MainComponent, SearchFormComponent],
})
export class BookingModule {}
