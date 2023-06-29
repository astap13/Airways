import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlightComponent } from './pages/flight/flight.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'booking',
    component: FlightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
