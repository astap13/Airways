import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject,
} from 'rxjs';

interface ICity {
  name: string;
  code: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  cities: ICity[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  fromModel: ICity | undefined;

  toModel: ICity | undefined;

  searchFormGroup!: FormGroup;

  ngOnInit() {
    this.searchFormGroup = new FormGroup({
      selectedWay: new FormControl(),
    });
  }

  submit() {
    console.log('this.submit');
  }

  formatCityResult = (value: ICity) => value.name;

  @ViewChild('fromInstance', { static: true }) fromInstance!: NgbTypeahead;

  @ViewChild('toInstance', { static: true }) toInstance!: NgbTypeahead;

  fromFocus$ = new Subject<string>();

  fromClick$ = new Subject<string>();

  toFocus$ = new Subject<string>();

  toClick$ = new Subject<string>();

  fromSearch: OperatorFunction<string, readonly ICity[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.fromClick$.pipe(
      filter(() => !this.fromInstance.isPopupOpen()),
    );
    const inputFocus$ = this.fromFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        term === ''
          ? this.cities
          : this.cities.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1),
      ),
    );
  };

  toSearch: OperatorFunction<string, readonly ICity[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.toClick$.pipe(filter(() => !this.toInstance.isPopupOpen()));
    const inputFocus$ = this.toFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        term === ''
          ? this.cities
          : this.cities.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1),
      ),
    );
  };
}
