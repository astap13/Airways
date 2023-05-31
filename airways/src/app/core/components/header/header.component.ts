import { Component, OnInit } from '@angular/core';

interface IFormsOfDates {
  name: string;
}

interface IValute {
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  formsOfDates!: IFormsOfDates[];

  selectedFormsOfDates: IFormsOfDates = { name: 'MM/DD/YYYY' };

  valutes!: IValute[];

  selectedValute!: IValute;

  ngOnInit() {
    this.formsOfDates = [
      { name: 'MM/DD/YYYY' },
      { name: 'DD/MM/YYYY' },
      { name: 'YYYY/DD/MM' },
      { name: 'YYYY/MM/DD' },
    ];

    this.valutes = [{ name: 'EUR' }, { name: 'USA' }, { name: 'BYN' }, { name: 'PLN' }];
  }
}
