import { combineEpics } from 'redux-observable';

import foodEpic from 'redux/epics/food.epic';

export const rootEpic = combineEpics(
  ...foodEpic,
);
