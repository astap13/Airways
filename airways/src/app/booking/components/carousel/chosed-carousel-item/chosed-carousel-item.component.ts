import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppStateInterface } from 'src/app/redux/appState.interface';

@Component({
  selector: 'app-chosed-carousel-item',
  templateUrl: './chosed-carousel-item.component.html',
  styleUrls: ['./chosed-carousel-item.component.scss'],
})
export class ChosedCarouselItemComponent implements OnInit, OnChanges {
  @Input() flight!: any | null;

  response!: any;

  loading: boolean = true;

  constructor(private http: HttpClient, private store: Store<IAppStateInterface>) {}

  ngOnInit() {
    this.request();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['flight'] && !changes['flight'].firstChange) {
      this.request();
    }
  }

  async request() {
    this.response = [];
    const url = `https://airways-api-ckd3.onrender.com/searchByDirection?from=${
      this.flight!.from
    }&to=${this.flight.to}&date=${this.flight.date}`;

    try {
      const response = await this.http.get(url).toPromise();
      this.response = response;
      // this.store.dispatch(bookingActions.setSelectedToFlight({ selectedToFlight: this.response }));
    } catch (error) {
      console.error('Error occurred during the POST request:', error);
    }

    this.loading = false;
  }
}
