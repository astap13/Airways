import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IActuallyFlights } from '../carousel-item/carousel-item.component';

@Component({
  selector: 'app-chosed-carousel-item',
  templateUrl: './chosed-carousel-item.component.html',
  styleUrls: ['./chosed-carousel-item.component.scss'],
})
export class ChosedCarouselItemComponent implements OnInit, OnChanges {
  @Input() flight!: IActuallyFlights | null;

  response!: any;

  loading: boolean = true;

  constructor(private http: HttpClient) {}

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
    const url = 'https://airways-api-ckd3.onrender.com/post';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    try {
      const response = await this.http.post(url, this.flight, httpOptions).toPromise();
      console.log('Response:', response);
      this.response = response;
    } catch (error) {
      console.error('Error occurred during the POST request:', error);
    }

    this.loading = false;
  }
}
