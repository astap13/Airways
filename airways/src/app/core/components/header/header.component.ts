import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { IFormsOfDates, IValute } from './models/header.interface';
import * as HeaderValuesActions from './store/actions';
import { isLoadingChoseFormDateSelector, isLoadingChoseValuteSelector } from './store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectedValute$: Observable<string>;

  selectedFormsOfDates$: Observable<string>;

  constructor(private store: Store<IAppStateInterface>) {
    this.selectedValute$ = this.store.pipe(select(isLoadingChoseValuteSelector));
    this.selectedFormsOfDates$ = this.store.pipe(select(isLoadingChoseFormDateSelector));
  }

  formsOfDates!: IFormsOfDates[];

  valutes!: IValute[];

  ngOnInit() {
    this.store.dispatch(HeaderValuesActions.getHeaderValues());

    this.formsOfDates = [
      { name: 'MM/DD/YYYY' },
      { name: 'DD/MM/YYYY' },
      { name: 'YYYY/DD/MM' },
      { name: 'YYYY/MM/DD' },
    ];

    this.valutes = [{ name: 'EUR' }, { name: 'USA' }, { name: 'BYN' }, { name: 'PLN' }];
  }
}
