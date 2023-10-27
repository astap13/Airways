import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PassengersFormsComponent } from './components/passengers-forms/passengers-forms.component';
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
    children: [
      {
        path: 'flightForm',
        component: PassengersFormsComponent,
      },
    ],
  },
];

//TODO переделать роутинг и структуру приложения. Неправильная иерархия в компонентах

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
