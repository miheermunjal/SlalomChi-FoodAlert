import { AnyAction } from 'redux';

import { FoodMetric } from 'models/food-metric.model';
import { FoodBandit } from 'models/food-bandit.model';
import { type } from 'util/action-type.util';
import { FoodKind } from 'models/food-kind.enum';

export const FoodActions = {
  GET_BLUEBERRY_SUCCESS: type('food/GET_BLUEBERRY_SUCCESS'),
  GET_FOOD: type('food/GET_FOOD'),
  GET_BANDITS: type('food/GET_BANDITS'),
  GET_STRAWBERRY_SUCCESS: type('food/GET_STRAWBERRY_SUCCESS'),
  GET_STRAWBERRY_BANDITS_SUCCESS: type('food/GET_STRAWBERRY_BANDITS_SUCCESS'),
  GET_BLUEBERRY_BANDITS_SUCCESS: type('food/GET_BLUEBERRY_BANDITS_SUCCESS'),
  IS_REQUESTING: type('food/IS_REQUESTING'),
};

// FOOD
// ----

export const getFood = (payload: FoodKind): AnyAction => {
  return { type: FoodActions.GET_FOOD, payload };
};

export const isRequesting = (payload: boolean): AnyAction => {
  return { type: FoodActions.IS_REQUESTING, payload };
};

export const getBlueBerryFulFilled = (payload: FoodMetric[]): AnyAction => {
  return { type: FoodActions.GET_BLUEBERRY_SUCCESS, payload };
};

export const getStrawBerryFulFilled = (payload: FoodMetric[]): AnyAction => {
  return { type: FoodActions.GET_STRAWBERRY_SUCCESS, payload };
};

// BANDITS
// -------

export const getBandits = (payload: FoodKind): AnyAction => {
  return { type: FoodActions.GET_BANDITS, payload };
};

export const getBlueBerryBanditsFulFilled = (payload: FoodBandit[]): AnyAction => {
  return { type: FoodActions.GET_BLUEBERRY_BANDITS_SUCCESS, payload };
};

export const getStrawBerryBanditsFulFilled = (payload: FoodBandit[]): AnyAction => {
  return { type: FoodActions.GET_STRAWBERRY_BANDITS_SUCCESS, payload };
};
