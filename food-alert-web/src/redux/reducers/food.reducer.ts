import { AnyAction } from 'redux';

import { FoodActions } from 'redux/actions/food.action';
import { FoodMetric } from 'models/food-metric.model';
import { FoodBandit } from 'models/food-bandit.model';

export interface FoodState {
  blueberryBandits: FoodBandit[];
  blueberryMetrics: FoodMetric[];
  isRequestingfoods: boolean;
  strawberryBandits: FoodBandit[];
  strawberryMetrics: FoodMetric[];
}

export const foodState: FoodState = {
  blueberryBandits: [],
  blueberryMetrics: [],
  isRequestingfoods: false,
  strawberryBandits: [],
  strawberryMetrics: [],
};

export const foodReducer = (state: FoodState = foodState, action: AnyAction) => {
  switch (action.type) {
    case FoodActions.GET_FOOD:
      return {
        ...state,
      };

    case FoodActions.IS_REQUESTING:
      return {
        ...state,
        isRequestingfoods: action.payload
      };

    case FoodActions.GET_BLUEBERRY_SUCCESS:
      return {
        ...state,
        blueberryMetrics: action.payload
      };

    case FoodActions.GET_STRAWBERRY_SUCCESS:
      return {
        ...state,
        strawberryMetrics: action.payload
      };

    case FoodActions.GET_BLUEBERRY_BANDITS_SUCCESS:
      return {
        ...state,
        blueberryBandits: action.payload
      };

    case FoodActions.GET_STRAWBERRY_BANDITS_SUCCESS:
      return {
        ...state,
        strawberryBandits: action.payload
      };

    default:
      return state;
  }
};
