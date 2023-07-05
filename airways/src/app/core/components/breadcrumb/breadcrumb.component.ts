import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { filter, map, tap } from 'rxjs/operators';
import { IAppStateInterface } from 'src/app/redux/appState.interface';

import { setStep } from '../header/store/actions';
import { isLoadingStep } from '../header/store/selectors';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  showBreadcrumb: boolean;

  actualStep: number;

  constructor(
    private store: Store<IAppStateInterface>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.showBreadcrumb = false;
    this.actualStep = 0;
  }

  ngOnInit() {
    // Subscribe to the step value from the store
    this.store.pipe(select(isLoadingStep)).subscribe((step) => {
      this.actualStep = step;
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map((route) => route.snapshot.url),
        map((url) => (url.length > 0 ? url[0].path : '')),
        tap((route) => {
          switch (route) {
            case '':
              this.store.dispatch(setStep({ step: 0 }));
              break;
            case 'booking':
              this.store.dispatch(setStep({ step: 1 }));
              break;
            case 'passenger':
              this.store.dispatch(setStep({ step: 2 }));
              break;
            case 'summary':
              this.store.dispatch(setStep({ step: 3 }));
              break;
            default:
              this.store.dispatch(setStep({ step: 0 }));
              break;
          }
        }),
      )
      .subscribe();
  }
}
