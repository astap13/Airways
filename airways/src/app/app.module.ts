/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';

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
    CoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    DividerModule,
    InputTextModule,
    BookingModule,
  ],
})
export class AppModule {}
