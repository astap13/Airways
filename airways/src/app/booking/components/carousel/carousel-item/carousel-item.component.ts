import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';
import { selectedToFlight } from 'src/app/redux/selectors';

export interface IActuallyFlights {
  date: Date;
  day: string;
  price: number;
}

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent implements OnInit {
  @Input() flight!: any | null;

  response: any;

  loading: boolean = true;

  selectedFlight$: Observable<any>;

  constructor(private http: HttpClient, private store: Store<IAppStateInterface>) {
    this.selectedFlight$ = this.store.pipe(select(selectedToFlight));
  }

  ngOnInit() {
    this.request();
  }

  async request() {
    const url = `https://airways-api-ckd3.onrender.com/searchByDirection?from=${
      this.flight!.from
    }&to=${this.flight.to}&date=${this.flight.date}`;

    try {
      const response = await this.http.get(url).toPromise();
      this.response = response;
    } catch (error) {
      console.error('Error occurred during the POST request:', error);
    }

    this.loading = false;
  }
}
