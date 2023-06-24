import { createSelector } from '@ngrx/store';

import { IAppStateInterface } from 'src/app/redux/appState.interface';

export const selectFeature = (state: IAppStateInterface) => state.booking;

export const selectedWaySelector = createSelector(selectFeature, (state) => state.selectedWay);
