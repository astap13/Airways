import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { IFormsOfDates, IValute } from './models/header.interface';
import * as HeaderValuesActions from './store/actions';
import {
  isLoadingSelectedFormDateSelector,
  isLoadingSelectedValuteSelector,
  isLoadingStep,
} from './store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectedValute$: Observable<string>;

  selectedFormsOfDates$: Observable<string>;

  formsOfDates!: IFormsOfDates[];

  valutes!: IValute[];

  actualStep$: Observable<number> | null = null;

  loginOrRegistration: boolean = true;

  loginStatus: boolean = false;

  userEmail: string;

  constructor(
    private store: Store<IAppStateInterface>,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    this.selectedValute$ = this.store.pipe(select(isLoadingSelectedValuteSelector));
    this.selectedFormsOfDates$ = this.store.pipe(select(isLoadingSelectedFormDateSelector));
    this.actualStep$ = this.store.pipe(select(isLoadingStep));
  }

  ngOnInit() {
    this.store.dispatch(HeaderValuesActions.getHeaderValues());

    this.formsOfDates = [
      { name: 'MM/DD/YYYY' },
      { name: 'DD/MM/YYYY' },
      { name: 'YYYY/DD/MM' },
      { name: 'YYYY/MM/DD' },
    ];

    this.checkLogin();

    this.valutes = [{ name: 'EUR' }, { name: 'USA' }, { name: 'BYN' }, { name: 'PLN' }];
  }

  selectFormOfDate(formOfDate: string) {
    this.store.dispatch(
      HeaderValuesActions.setSelectedFormOfDates({ selectedFormOfDates: formOfDate }),
    );
  }

  selectValute(valute: string) {
    this.store.dispatch(HeaderValuesActions.setSelectedValutes({ selectedValutes: valute }));
  }

  isBookingRoute(): boolean {
    return this.route.snapshot.routeConfig?.path === 'booking';
  }

  openVerticallyCentered(registrationModal) {
    this.modalService.open(registrationModal, { centered: true });
  }

  toLogin() {
    this.loginOrRegistration = true;
  }

  toRegistration() {
    this.loginOrRegistration = false;
  }

  checkLogin() {
    if (localStorage.getItem('user')) {
      this.loginStatus = true;
      this.userEmail = JSON.parse(localStorage.getItem('user')).email;
    }
  }
}
