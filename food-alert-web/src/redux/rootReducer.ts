import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { foodReducer } from 'redux/reducers/food.reducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  food: foodReducer,
});
