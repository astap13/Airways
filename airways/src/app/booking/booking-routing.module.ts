import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PassangersFormsComponent } from './components/passangers-forms/passangers-forms.component';
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
        component: PassangersFormsComponent,
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
