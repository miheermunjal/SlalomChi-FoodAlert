import { History, createBrowserHistory } from 'history';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import { applyEnhancers } from 'util/enhancers.util';
import { rootEpic } from 'redux/rootEpic';
import { rootReducer } from 'redux/rootReducer';
import { FoodState } from 'redux/reducers/food.reducer';

const epicMiddleware = createEpicMiddleware(rootEpic);
export const history: History = createBrowserHistory();

export interface AppState {
  food: FoodState;
}

const enhancers = applyEnhancers([]);

const middleware = [
  epicMiddleware,
  routerMiddleware(history)
];

const preloadedState = {};

const enhancer = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  preloadedState,
  enhancer
);

export default store;
