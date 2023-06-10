import { NgFor } from '@angular/common';
/* eslint-disable import/no-extraneous-dependencies */
import { isDevMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    NgbDatepickerModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
})
export class AppModule {}
