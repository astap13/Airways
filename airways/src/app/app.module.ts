import { NgFor } from '@angular/common';
/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdownModule, NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingModule } from './booking/booking.module';
import { CoreComponent } from './core/core.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, CoreComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BookingModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    CoreModule,
    MatMenuModule,
    MatButtonModule,
    NgbModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AppModule {}
