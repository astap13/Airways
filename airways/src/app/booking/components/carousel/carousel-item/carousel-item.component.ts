import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

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
  @Input() flight!: IActuallyFlights | null;

  responce!: any;

  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.request();
  }

  async request() {
    this.responce = [];
    const url = 'https://airways-api-ckd3.onrender.com/post';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    try {
      const response = await this.http.post(url, this.flight, httpOptions).toPromise();
      console.log('Post Request Response:', response);
      this.responce = response;
    } catch (error) {
      console.error('Error occurred during the POST request:', error);
    }

    this.loading = false;
  }
}

// обработка даты на стороне главного компонента
// const date: NgbDateStruct = flightData.selectedDate.fromDate;

//         const day = (date.day + i).toString().padStart(2, '0');
//         const month = date.month.toString().padStart(2, '0');
//         const year = date.year;

//         const formattedDate = `${day}-${month}-${year}`;
//         const requestBody = {
//           from: flightData.selectedFromCity,
//           to: flightData.selectedDestinationCity,
//           date: formattedDate,
//         };
//         console.log(requestBody);
