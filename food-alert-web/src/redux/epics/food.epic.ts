import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action, Store, AnyAction } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import {
  FoodActions,
  getBlueBerryBanditsFulFilled,
  getBlueBerryFulFilled,
  getStrawBerryBanditsFulFilled,
  getStrawBerryFulFilled,
  isRequesting,
} from 'redux/actions/food.action';
import foodService from 'services/food.service';
import { FoodMetric } from 'models/food-metric.model';
import { FoodBandit } from 'models/food-bandit.model';
import { FoodKind } from 'models/food-kind.enum';

export const getFoodMetrics = (action$: ActionsObservable<Action>, store: Store<Action>): Observable<Action> =>
  action$.ofType(FoodActions.GET_FOOD)
    .do(() => store.dispatch(isRequesting(true)))
    .switchMap((action: AnyAction) => {
      const kind = action.payload;
      const options = { kind };

      return foodService.getMetrics(options)
        .then((response: FoodMetric[]) => {
          return kind === FoodKind.BLUEBERRY ?
            store.dispatch(getBlueBerryFulFilled(response)) :
            store.dispatch(getStrawBerryFulFilled(response));
        });
    })
    .do(() => store.dispatch(isRequesting(false)));

export const getBandits = (action$: ActionsObservable<Action>, store: Store<Action>): Observable<Action> =>
  action$.ofType(FoodActions.GET_BANDITS)
    .do(() => store.dispatch(isRequesting(true)))
    .switchMap((action: AnyAction) => {
      const kind = action.payload;
      const options = { kind };

      return foodService.getBandits(options)
        .then((response: FoodBandit[]) => {
          return kind === FoodKind.BLUEBERRY ?
            store.dispatch(getBlueBerryBanditsFulFilled(response)) :
            store.dispatch(getStrawBerryBanditsFulFilled(response));
        });
    })
    .do(() => store.dispatch(isRequesting(false)));

export default [
  getFoodMetrics,
  getBandits,
];
